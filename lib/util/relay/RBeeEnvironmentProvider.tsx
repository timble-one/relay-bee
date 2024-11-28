import {useRelayEnvironmentCreator} from "./useRelayEnvironmentCreator.ts";
import {RelayEnvironmentProvider} from "react-relay";
import {ReactNode} from "react";
import {RBeeEnvironmentContext} from "./useRBeeEnvironment.ts";

export const RBeeEnvironmentProvider = ({children}: {children: ReactNode}) => {
    const relayEnvironmentCreator = useRelayEnvironmentCreator()
    const relayEnvironment = relayEnvironmentCreator()
    return (
        <RelayEnvironmentProvider environment={relayEnvironment}>
            <RBeeEnvironmentContext.Provider value={relayEnvironment}>
                {children}
            </RBeeEnvironmentContext.Provider>
        </RelayEnvironmentProvider>
    )
}
