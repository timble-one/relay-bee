import {ObjectSchema} from "../ObjectSchema"
import {ValidData} from "../useEntitySaver"
import {removeRelayProps, Stripped} from "./removeRelayProps"
import {useValidation} from "./useValidation"

const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined

type Props<VALIDATION> = {
    validationSchema: VALIDATION,
    subValidation: (() => boolean) | undefined
}

export const useSaveMutation = <VALIDATION extends ObjectSchema>(props: Props<VALIDATION>) => {
    const validate = useValidation()
    return <DATA extends Record<string, unknown>>(
        rawData: DATA,
        updateFn: (existingEntity: Stripped<ValidData<DATA, VALIDATION>> & {id: string}) => void,
        createFn: (newEntity: Stripped<ValidData<DATA, VALIDATION>>) => void
    ) => {
        const validData = validate<DATA, VALIDATION>(props.validationSchema, rawData, props.subValidation)
        const inputData = validData && removeRelayProps(validData)
        if (inputData && !Array.isArray(inputData) && hasId(inputData)) {
            updateFn(inputData)
        } else {
            if (inputData) createFn(inputData)
        }
    }
}