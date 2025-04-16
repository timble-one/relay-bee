import {useAlerts} from "../../alert/useAlerts.ts";
import {z, ZodError, ZodTypeAny} from "zod";
import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {removeRelayProps} from "../../../util/relay/util.ts";

export type ValidData<DATA, VALIDATION extends ZodTypeAny> = z.infer<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type Props<DATA, PARTIAL_DATA, VALIDATION extends ZodTypeAny, PRE_PROCESSED = PARTIAL_DATA> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate?: (v: PARTIAL_DATA) => PRE_PROCESSED
    update: (existingEntity: ValidData<PRE_PROCESSED, VALIDATION> & {id: string}) => void
    create: (newEntity: ValidData<PRE_PROCESSED, VALIDATION>) => void
}

export const useEntitySaver = <
    DATA extends {id?: string} & PARTIAL_DATA,
    VALIDATION extends ZodTypeAny,
    PARTIAL_DATA = Partial<DATA>
>(
    {data, validationSchema, update, create, preValidate = (v: PARTIAL_DATA) => v}: Props<DATA, PARTIAL_DATA, VALIDATION>
) => {
    const {addAlert} = useAlerts()
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper()

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const validate = <DATA extends object, VALIDATION extends ZodTypeAny>(
        validationSchema: VALIDATION,
        rawData: PARTIAL_DATA
    ): ValidData<DATA, VALIDATION> | undefined => {
        const data = preValidate(rawData)
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
