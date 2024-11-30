// @ts-expect-error: RouterContext is missing in the index.d.ts file of the found package (reason unknown)
import {RouterState, RouterContext} from "found";
import {ReactNode} from "react";

type Props = {
    router: RouterState,
    children: ReactNode
}

export const PeerRouterProvider = ({router, children}: Props) => {
    return (
        <RouterContext.Provider value={router}>
            {children}
        </RouterContext.Provider>
    )
}
