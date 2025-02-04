export const setProp = (obj: Record<string, string | unknown>, path: string, value: string) => {
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

export const removePropsRecursive = <T, P extends string>(obj: T, keys: ReadonlyArray<P>): RecursiveOmit<T, P> =>
    !obj || typeof obj !== 'object'
        ? obj as RecursiveOmit<T, P>
        : Array.isArray(obj)
            ? obj.map((item: unknown) => removePropsRecursive(item, keys)) as RecursiveOmit<T, P>
            : Object.fromEntries(Object.entries(obj as object)
                .filter(([k]) => !(keys as readonly string[]).includes(k))
                .map(item => item && removePropsRecursive(item, keys))) as RecursiveOmit<T, P>
;

export type RecursiveOmit<T, O extends string> = T extends (infer U)[]
    ? RecursiveOmit<U, O>[]
    : T extends Record<string, unknown>
        ? {
            [K in Exclude<keyof T, O>]: RecursiveOmit<T[K], O>;
        }
        : T
;
