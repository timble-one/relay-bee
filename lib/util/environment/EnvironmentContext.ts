import {createContext} from "react";

export type EnvironmentContextType = {
    httpEndpoint: string
    basePath: string
    passwordPath: string
}

export const EnvironmentContext = createContext<Partial<EnvironmentContextType>>({})
