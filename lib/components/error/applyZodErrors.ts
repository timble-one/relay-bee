import {ZodError} from "zod";

export const applyZodErrors = (error: ZodError, apply: (error: string) => void) => {
    error?.issues.forEach(e => {
        const path = e.path.join('/')
        const message = path ? [path, e.message] : [e.message]
        apply(message.join(': '))
    })
    return false
}
