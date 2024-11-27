import {createContext, useContext} from "react";
import {Environment} from "relay-runtime";

export const RBeeEnvironmentContext = createContext<Environment | undefined>(undefined)

export const useRBeeEnvironment = () => {
    const context = useContext(RBeeEnvironmentContext)
    if (!context) {
        throw new Error('RBeeEnvironmentContext must be defined')
    }
    return context
}