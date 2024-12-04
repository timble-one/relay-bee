import {createContext} from "react";

type SystemEnvContext = {
    httpEndpoint: string
    authPath?: string
    passwordPath?: string
}

export const SystemEnvContext = createContext<SystemEnvContext | undefined>(undefined)
