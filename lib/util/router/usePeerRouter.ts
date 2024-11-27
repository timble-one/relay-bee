import {createContext, useContext} from "react";
import {RouterState} from "found";

type RBeeRouterContext = RouterState | undefined
export const RBeeRouterContext = createContext<RBeeRouterContext>(undefined)

export const usePeerRouter = () => {
    const rBeeRouterContext = useContext(RBeeRouterContext)
    if (!rBeeRouterContext) {
        throw new Error('RBeeRouterContext must be defined')
    }
    return rBeeRouterContext
}
