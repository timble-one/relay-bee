import {useEffect, useState} from "react";
import {usePrevious} from "../../../util/usePrevious.ts";

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
    state: Partial<T>
    setState: (state: Partial<T>) => void
    inputProps: <K extends keyof T>(name: K) => InputProps<T[K]>
    onChange: typeof getChangeListener
} => {
    const [state, setState] = useState<Partial<T>>(entity ?? {})
    const getChangeListener = getChangeListenerFactory(state, setState)

    const previousEntity = usePrevious(entity)
    // updating of the state from the entity is needed when one navigates between different products
    useEffect(() => {
        // this comparison is needed because otherwise endless loops can occur
        // for example when the entity is destructured and reassembled to modify something
        // (e.g. stringify user-roles)
        // the updated state would trigger a rerender of the detail-page which would create a new entity instance again
        if (JSON.stringify(entity) !== JSON.stringify(previousEntity)) {
            setState(entity ?? {})
        }
    }, [entity])

    const inputProps = <K extends keyof T>(name: K) => (
        {value: state[name], onChange: getChangeListener(name)}
    )

    return {state, setState, inputProps, onChange: getChangeListener}
}
