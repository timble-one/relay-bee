import {useState} from "react";
import {PartialDeep} from "type-fest";

const getChangeListenerFactory =
    <T, K extends keyof T>(state: PartialDeep<T>, setState: (state: PartialDeep<T>) => void) =>
        (field: K) =>
            (newValue: PartialDeep<T[K]>) =>
                state && setState({...state, [field]: newValue})
;

type InputProps<T> = {
    value: PartialDeep<T> | undefined
    onChange: (newValue: T) => void
}

/*function getValue<T, K extends keyof T>(obj: PartialDeep<T>, key: K): T[K] | undefined {
    return obj && key in obj ? (obj as T )[key] : undefined; // Type assertion
}*/

export const useEntityState = <T extends object>(entity: PartialDeep<T> | undefined | null): {
    state: PartialDeep<T>,
    setState: (state: PartialDeep<T>) => void,
    inputProps: <K extends keyof T>(name: K) => InputProps<PartialDeep<T[K]>>
} => {
    const [state, setState] = useState<PartialDeep<T>>(entity ?? <PartialDeep<T>>{});
    const getChangeListener = getChangeListenerFactory<T, keyof T>(state, setState)

    const inputProps = (name: keyof T) => (
        {value: state[name], onChange: getChangeListener(name)}
    )

    return {state, setState, inputProps}
}
