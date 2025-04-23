import {useAlerts} from "../../alert/useAlerts.ts";
import {z, ZodError, ZodTypeAny} from "zod";
import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {removeRelayProps} from "../../../util/relay/util.ts";
import {ifPresent} from "tssentials";

export type ValidData<DATA, VALIDATION extends ZodTypeAny> = z.infer<VALIDATION> & Partial<DATA>
type OrElse<T, D> = [T] extends [undefined] ? D : T;
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type Props<DATA, VALIDATION extends ZodTypeAny, PRE_PROCESSED, OPTIONALLY_PROCESSED = OrElse<PRE_PROCESSED, DATA>> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate?: (v: DATA) => PRE_PROCESSED
    update: (existingEntity: ValidData<OPTIONALLY_PROCESSED, VALIDATION> & {id: string}) => void
    create: (newEntity: ValidData<OPTIONALLY_PROCESSED, VALIDATION>) => void
}

export const useEntitySaver = <
    DATA extends {id?: string},
    VALIDATION extends ZodTypeAny,
    PRE_PROCESSED = undefined,
>(
    {data, validationSchema, update, create, preValidate}: Props<DATA, VALIDATION, PRE_PROCESSED>
) => {
    const {addAlert} = useAlerts()
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper()

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const validate = (
        validationSchema: VALIDATION,
        rawData: DATA
    ): ValidData<DATA, VALIDATION> | undefined => {
        const data = ifPresent(preValidate, v => v(rawData)) ?? rawData
        const result = validationSchema.safeParse(data)
        if (result.success) {
            return {...data, ...result.data}
        } else {
            const error: ZodError = result.error
            console.warn(error)
            error?.errors.forEach(e => {
                const path = e.path.join('/')
                const message = path ? [path, e.message] : [e.message]
                addAlert(message.join(': '), 'WARNING')
            })
        }
    };

    const save = () => {
        const validData = validate(validationSchema, data)
        const inputData = validData && removeRelayProps(validData)
        if (inputData && hasId(inputData)) {
            update(inputData)
        } else {
            if (inputData) create(inputData)
        }
    }

    return {save, commitProps}
}
