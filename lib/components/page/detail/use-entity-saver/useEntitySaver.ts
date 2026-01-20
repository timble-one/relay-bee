import {useAlerts} from "../../../alert/useAlerts.ts"
import {z} from "zod"
import {useErrorWrapper} from "../../../alert/useErrorWrapper.ts"
import {ObjectSchema} from "./ObjectSchema.ts"
import {Stripped} from "./use-save-mutation/removeRelayProps.ts"
import {useSaveMutation} from "./use-save-mutation/useSaveMutation.ts"

export type ValidData<DATA, VALIDATION extends z.ZodType> = z.output<VALIDATION> & Partial<DATA>

type BaseProps<DATA, VALIDATION> = {
    data: DATA
    validationSchema: VALIDATION
    subValidation?: () => boolean
}

type Props<DATA, VALIDATION extends ObjectSchema> = BaseProps<DATA, VALIDATION> & {
    preValidate?: undefined
    update: (existingEntity: Stripped<ValidData<DATA, VALIDATION>> & {id: string}) => void
    create: (newEntity: Stripped<ValidData<DATA, VALIDATION>>) => void
}

type PropsWithPreProcessing<DATA, VALIDATION extends ObjectSchema, PRE_PROCESSED> = BaseProps<DATA, VALIDATION> & {
    preValidate: (v: DATA) => PRE_PROCESSED
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
    const mutate = useSaveMutation({validationSchema, subValidation})

    const save = () => {
        if (preValidate) {
            mutate(preValidate(data), props.update, props.create)
        } else {
            mutate(data, props.update, props.create)
        }
    }

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    return {save, commitProps, addAlert}
}
