import {Context, ReactNode} from "react";
import {Match, Router} from "found";
import {usePeerRouter} from "./usePeerRouter.ts";

// copied from found-library because it is not exported
export interface RouterContextState<TContext> {
    match: Match<TContext> | null;
    router: Router;
}

type Props = {
    Context: Context<RouterContextState<unknown>>
    children: ReactNode
}

export const RBeeRouterProvider = ({Context, children}: Props) => {
    const router = usePeerRouter();
    return (
        <Context.Provider value={router}>
            {children}
        </Context.Provider>
    )
}
