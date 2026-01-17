import {useAlerts} from "../../../alert/useAlerts.ts";
import {z, ZodError} from "zod";
import {useErrorWrapper} from "../../../alert/useErrorWrapper.ts";
import {applyZodErrors} from "../../../error/applyZodErrors.ts";
import {removeRelayProps, type Stripped} from "./removeRelayProps.ts";

type ObjectSchema = z.ZodType<Record<string, unknown>, Record<string, unknown>>

export type ValidData<DATA, VALIDATION extends z.ZodType> = z.output<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type PropsNoPre<DATA, VALIDATION extends ObjectSchema> = {
    data: DATA
    validationSchema: VALIDATION
    preValidate?: undefined
    subValidation?: () => boolean
    update: (existingEntity: Stripped<ValidData<DATA, VALIDATION>> & {id: string}) => void
    create: (newEntity: Stripped<ValidData<DATA, VALIDATION>>) => void
}

type PropsWithPre<DATA, VALIDATION extends ObjectSchema, PRE_PROCESSED> = {
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
    props: PropsNoPre<DATA, VALIDATION> | PropsWithPre<DATA, VALIDATION, PRE_PROCESSED>
) => {
    const {data, validationSchema, preValidate, subValidation} = props
    const {addAlert} = useAlerts()
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper()

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const validate = <D extends Record<string, unknown>>(
        validationSchema: VALIDATION,
        rawData: D
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

    const saveWith = <D extends Record<string, unknown>>(
        rawData: D,
        updateFn: (existingEntity: Stripped<ValidData<D, VALIDATION>> & {id: string}) => void,
        createFn: (newEntity: Stripped<ValidData<D, VALIDATION>>) => void
    ) => {
        const validData = validate(validationSchema, rawData)
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
