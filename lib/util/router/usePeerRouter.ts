import {createContext, useContext} from "react";
import {RouterState} from "found";

export const RBeeRouterContext = createContext<RouterState | undefined>(undefined)

export const usePeerRouter = () => {
    const context = useContext(RBeeRouterContext)
    if (!context) {
        throw new Error('RBeeRouterContext must be defined')
    }
    return context
}
