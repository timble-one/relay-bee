import {ZodError} from "zod"
import {useAlerts} from "../../../alert/useAlerts"
import {applyZodErrors} from "../../../error/applyZodErrors"
import {ObjectSchema} from "./ObjectSchema"
import {ValidData} from "./useEntitySaver"

export const useValidation = () => {
    const {addAlert} = useAlerts()
    return <D extends Record<string, unknown>, VALIDATION extends ObjectSchema>(
        validationSchema: VALIDATION,
        rawData: D,
        subValidation?: () => boolean,
    ): ValidData<D, VALIDATION> | undefined => {
        const data = rawData
        const subResult = subValidation === undefined || subValidation()
        const result = validationSchema.safeParse(data)
        if (result.success && subResult) {
            return {...data, ...result.data}
        }
        if (result.error) {
            const error: ZodError = result.error
            console.warn(error)
            applyZodErrors(error, e => addAlert(e, 'WARNING'))
        }
    }
}