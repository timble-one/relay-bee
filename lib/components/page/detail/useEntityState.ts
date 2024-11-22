import {useState} from "react";

const getChangeListenerFactory =
    <T, K extends keyof T>(state: T, setState: (state: T) => void) =>
        (field: K) =>
            (newValue: T[K]) =>
                state && setState({...state, [field]: newValue})
;

type InputProps<T> = {
    value: T | undefined;
    onChange: (newValue: T) => void;
}

export const useEntityState = <T extends object>(entity: Partial<T> | undefined | null): {
    state: Partial<T>,
    setState: (state: Partial<T>) => void,
    inputProps: <K extends keyof T>(name: K) => InputProps<T[K]>
} => {
    const [state, setState] = useState<Partial<T>>(entity ?? {})
    const getChangeListener = getChangeListenerFactory(state, setState)

    const inputProps = <K extends keyof T>(name: K) => (
        {value: state[name], onChange: getChangeListener(name)}
    )

    return {state, setState, inputProps}
}
