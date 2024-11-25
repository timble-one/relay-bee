import {useContext, useEffect, useState} from "react";
import {useRouter} from "found";
import {EscapeContext} from "./EscapeContext.ts";

export const useBackOnEscape = (destination: string) => {
    const [enabled, setEnabled] = useState(true)
    const {router} = useRouter()
    const {setBackOnEscape: setParentEnabled} = useContext(EscapeContext)

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            if (enabled && e.key === 'Escape') {
                router.push(destination)
            }
        }
        document.addEventListener('keydown', keyDownHandler)
        return () => document.removeEventListener('keydown', keyDownHandler)
    }, [destination, enabled, router])

    useEffect(() => {
        setParentEnabled?.(false)
        return () => setParentEnabled?.(true)
    }, [setParentEnabled])

    return {backOnEscape: enabled, setBackOnEscape: setEnabled}
}
