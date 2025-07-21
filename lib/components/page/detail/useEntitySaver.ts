import {useAlerts} from "../../alert/useAlerts.ts";
import {z, ZodError, ZodTypeAny} from "zod";
import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {removeRelayProps} from "../../../util/relay/util.ts";
import {ifPresent} from "tssentials";
import {applyZodErrors} from "../../util/applyZodErrors.ts";

export type ValidData<DATA, VALIDATION extends ZodTypeAny> = z.infer<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type Props<DATA, VALIDATION extends ZodTypeAny, PRE_PROCESSED> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate?: (v: DATA) => PRE_PROCESSED
    subValidation?: () => boolean
    update: (existingEntity: ValidData<PRE_PROCESSED, VALIDATION> & {id: string}) => void
    create: (newEntity: ValidData<PRE_PROCESSED, VALIDATION>) => void
}

export const useEntitySaver = <
    DATA extends {id?: string},
    VALIDATION extends ZodTypeAny,
    PRE_PROCESSED = DATA,
>(
    {data, validationSchema, update, create, preValidate, subValidation}: Props<DATA, VALIDATION, PRE_PROCESSED>
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
        if (subValidation && !subValidation()) return
        const result = validationSchema.safeParse(data)
        if (result.success) {
            return {...data, ...result.data}
        } else {
            const error: ZodError = result.error
            console.warn(error)
            applyZodErrors(error, e => addAlert(e, 'WARNING'))
        }
    }

    const save = () => {
        const validData = validate(validationSchema, data)
        const inputData = validData && removeRelayProps(validData)
        if (inputData && hasId(inputData)) {
            update(inputData)
        } else {
            if (inputData) create(inputData)
        }
    }

    return {save, commitProps, addAlert}
}
