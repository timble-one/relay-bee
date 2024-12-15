import {useEnv} from "./environment/useEnv.ts";
import {RefinementCtx, z} from "zod";

export type ExtractNodeFromEdges<
    T extends {
        readonly edges: readonly ({readonly node: unknown} | undefined | null)[] | undefined | null
    } | undefined | null
>
    = NonNullable<NonNullable<NonNullable<NonNullable<T>['edges']>[number]>['node']>
;

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export const transformObjectMap = <INPUT extends {[key: string]: INPUT[KEY]}, OUTPUT, KEY extends keyof INPUT>(
    mapping: INPUT, transformer: (input: [string, INPUT[KEY]]) => [string, OUTPUT]
): { [key: string]: OUTPUT } =>
    Object.fromEntries(Object.entries(mapping).map(transformer))
;

export const nameToId = (name: string): string => name.toLowerCase()
    .replace(' ', '-')
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
;

export const useBackendPath = (): (path: string) => string => {
    const env = useEnv()
    return (path: string) => env.httpEndpoint + path
}

export const setObjectProperty = (obj: Record<string, string | unknown>, path: string, value: string) => {
    const keys = path.split('.')
    const lastKey = keys.pop()
    let current: Record<string, string | unknown> = obj

    keys.forEach(key => {
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        if (current[key] !== null && typeof current[key] === 'object' && current[key].constructor === Object) {
            current = current[key] as Record<string, unknown>;
        }
    });

    if (lastKey) {
        current[lastKey] = value;
    }
}

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
