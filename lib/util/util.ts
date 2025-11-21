import {RefinementCtx, z} from "zod";

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export const nameToId = (name: string): string => name.toLowerCase()
    .replace(' ', '-')
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
;

export const validateJSON = (str: string, ctx: RefinementCtx) => {
    try {
        return JSON.parse(str)
    } catch {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Ungültiges JSON Format',
        })
        return z.NEVER
    }
}
