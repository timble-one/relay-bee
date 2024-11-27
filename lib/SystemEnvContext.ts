import {createContext} from "react";

export const SystemEnvContext = createContext<{ httpEndpoint: string } | undefined>(undefined)
