import {createContext} from "react";

type EscapeContext = {backOnEscape: boolean, setBackOnEscape: ((escape: boolean) => void ) | undefined };

export const EscapeContext = createContext<EscapeContext>({backOnEscape: true, setBackOnEscape: undefined});