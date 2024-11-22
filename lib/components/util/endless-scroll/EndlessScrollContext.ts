import {createContext} from "react";

type Context = {
    scrollListener: () => void,
    setScrollListener: (listener: () => void) => void
};

export const EndlessScrollContext = createContext<Context>({
    scrollListener: () => undefined,
    setScrollListener: () => undefined}
);