import {createContext} from "react";

type EnvironmentContextType = {
    httpEndpoint: string,
}

export const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined)
