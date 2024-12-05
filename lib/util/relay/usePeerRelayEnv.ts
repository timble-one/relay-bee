import {createContext, useContext} from "react";
import {Environment} from "relay-runtime";

export const PeerRelayEnvContext = createContext<Environment | undefined>(undefined)

export const usePeerRelayEnv = () => {
    const context = useContext(PeerRelayEnvContext)
    if (!context) {
        throw new Error('RBeeEnvironmentContext must be defined')
    }
    return context
}