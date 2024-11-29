import {useContext, useEffect, useState} from "react";
import {FormContext} from "./FormContext";

export function useForm() {
    const {addSubmitListener, removeSubmitListener} = useContext(FormContext)
    const [submitListener, setSubmitListener] = useState(() => () => true)
    useEffect(() => {
        addSubmitListener(submitListener);
        return () => removeSubmitListener(submitListener)
    }, [submitListener])
    return {setSubmitListener}
}
