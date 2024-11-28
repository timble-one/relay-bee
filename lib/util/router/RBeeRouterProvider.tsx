import {Context, ReactNode} from "react";
import {Match, Router, RouterState} from "found";

// copied from found-library because it is not exported
export interface RouterContextState<TContext> {
    match: Match<TContext> | null;
    router: Router;
}

type Props = {
    router: RouterState,
    Context: Context<RouterContextState<unknown>>
    children: ReactNode
}

export const RBeeRouterProvider = ({router, Context, children}: Props) => {
    return (
        <Context.Provider value={router}>
            {children}
        </Context.Provider>
    )
}
