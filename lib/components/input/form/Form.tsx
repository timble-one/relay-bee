import React, {ReactNode, useState} from "react";
import {FormContext, SubmitListener} from "./FormContext";

type Props = {
    children: ReactNode;
    className?: string;
    onSubmit?: (e: React.SyntheticEvent) => void;
}

export function Form({children, className, onSubmit: submitListenerParam}: Props) {
    const [submitListeners, setSubmitListeners] = useState<(SubmitListener)[]>([]);
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (submitListeners.reduce((v, l) => v && l(), true) && submitListenerParam) {
            submitListenerParam(e);
        }
    };
    const addSubmitListener = (listener: SubmitListener) => {
        setSubmitListeners(listeners => [...listeners, listener]);
    };
    const removeSubmitListener = (listener: SubmitListener) => {
        setSubmitListeners(listeners => listeners.filter((l) => l !== listener));
    }
    return (
        <form className={className} onSubmit={submitHandler}>
            <FormContext.Provider value={{addSubmitListener, removeSubmitListener}}>
                {children}
            </FormContext.Provider>
        </form>
    )
}
