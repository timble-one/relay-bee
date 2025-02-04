import {useAlerts} from "../../alert/useAlerts.ts";
import {z, ZodError, ZodTypeAny} from "zod";
import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {removePropertiesRecursive} from "../../../util/property.ts";

export type ValidData<DATA, VALIDATION extends ZodTypeAny> = z.infer<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type Props<DATA, VALIDATION extends ZodTypeAny> = {
    data: DATA
    validationSchema: VALIDATION
    update: (existingEntity: ValidData<DATA, VALIDATION> & {id: string}) => void,
    create: (newEntity: ValidData<DATA, VALIDATION>) => void,
    subValidation?: {schema: ZodTypeAny, data: unknown}
}

export const useEntitySaver = <DATA extends {id?: string}, VALIDATION extends ZodTypeAny>(
    {data, validationSchema, update, create, subValidation}: Props<DATA, VALIDATION>
) => {
    const {addAlert} = useAlerts()
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper()

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const validate = <DATA extends object, VALIDATION extends ZodTypeAny>(
        validationSchema: VALIDATION,
        data: Partial<DATA>
    ): ValidData<DATA, VALIDATION> | undefined => {
        const subResult = subValidation?.schema.safeParse(subValidation?.data)
        const result = validationSchema.safeParse(data)
        if (result.success && (!subResult || subResult.success)) {
            return {...data, ...result.data}
        } else {
            const error: ZodError | undefined = subResult?.error || result.error
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
        const inputData = validData && removePropertiesRecursive(validData, ['__id', '__fragmentOwner', '__fragments'])
        if (inputData && hasId(inputData)) {
            update(inputData)
        } else {
            if (inputData) create(inputData)
        }
    }

    return {save, commitProps}
}
