import {useContext, useEffect} from "react";
import {EscapeContext} from "./EscapeContext.ts";

export const useCloseOnEscape = (open: boolean) => {
    const {setBackOnEscape} = useContext(EscapeContext)
    useEffect(() => {
        setBackOnEscape?.(!open)
    }, [setBackOnEscape, open])
}