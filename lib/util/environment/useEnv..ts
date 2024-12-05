import {useContext} from "react";
import {EnvironmentContext, EnvironmentContextType} from "./EnvironmentContext.ts";

export const useEnv = (): EnvironmentContextType => {
    const context = useContext(EnvironmentContext)
    return {
        httpEndpoint: context.basePath ?? 'https://localhost',
        basePath: context.basePath ?? '',
        passwordPath: context.basePath ?? 'password',
    }
}