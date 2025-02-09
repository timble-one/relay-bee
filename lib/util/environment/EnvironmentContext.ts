import {createContext} from "react";

export type EnvironmentContextType = {
    httpEndpoint: string
    basePath: string
    passwordPath: string
    adminBasePath: string
}

export const EnvironmentContext = createContext<Partial<EnvironmentContextType>>({})
