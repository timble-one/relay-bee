import {useAlerts} from "../../../alert/useAlerts.ts"
import {z} from "zod"
import {useErrorWrapper} from "../../../alert/useErrorWrapper.ts"
import {removeRelayProps, type Stripped} from "./removeRelayProps.ts"
import {ObjectSchema} from "./ObjectSchema.ts"
import {useValidation} from "./useValidation.ts"

export type ValidData<DATA, VALIDATION extends z.ZodType> = z.output<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined

type Props<DATA, VALIDATION extends ObjectSchema> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate?: undefined
    subValidation?: () => boolean
    update: (existingEntity: Stripped<ValidData<DATA, VALIDATION>> & {id: string}) => void
    create: (newEntity: Stripped<ValidData<DATA, VALIDATION>>) => void
}

type PropsWithPreProcessing<DATA, VALIDATION extends ObjectSchema, PRE_PROCESSED> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate: (v: DATA) => PRE_PROCESSED
    subValidation?: () => boolean
    update: (existingEntity: Stripped<ValidData<PRE_PROCESSED, VALIDATION>> & {id: string}) => void
    create: (newEntity: Stripped<ValidData<PRE_PROCESSED, VALIDATION>>) => void
}

export const useEntitySaver = <
    DATA extends Record<string, unknown> & {id?: string},
    VALIDATION extends ObjectSchema,
    PRE_PROCESSED extends Record<string, unknown> & {id?: string} = DATA,
>(
    props: Props<DATA, VALIDATION> | PropsWithPreProcessing<DATA, VALIDATION, PRE_PROCESSED>
) => {
    const {data, validationSchema, preValidate, subValidation} = props
    const {addAlert} = useAlerts()
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper()
    const validate = useValidation()

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const saveWith = <D extends Record<string, unknown>>(
        rawData: D,
        updateFn: (existingEntity: Stripped<ValidData<D, VALIDATION>> & {id: string}) => void,
        createFn: (newEntity: Stripped<ValidData<D, VALIDATION>>) => void
    ) => {
        const validData = validate(validationSchema, rawData, subValidation)
        const inputData = validData && removeRelayProps(validData)
        if (inputData && !Array.isArray(inputData) && hasId(inputData)) {
            updateFn(inputData)
        } else {
            if (inputData) createFn(inputData)
        }
    }

    const save = () => {
        if (preValidate) {
            saveWith(preValidate(data), props.update, props.create)
        } else {
            saveWith(data, props.update, props.create)
        }
    }

    return {save, commitProps, addAlert}
}
