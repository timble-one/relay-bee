import {useContext} from "react";
import {EnvironmentContext, EnvironmentContextType} from "./EnvironmentContext.ts";

export const useEnv = (): EnvironmentContextType => {
    const context = useContext(EnvironmentContext)
    return {
        httpEndpoint: context.httpEndpoint ?? 'https://localhost',
        basePath: context.basePath ?? '',
        passwordPath: context.passwordPath ?? 'password',
        adminBasePath: context.adminBasePath ?? '/',
    }
}