import {ReactNode, useState} from "react";
import {EndlessScrollContext} from "./EndlessScrollContext.ts";

type Props = {
    className: string
    children: ReactNode
}

export function EndlessScrollContainer({className, children}: Props) {
    const [scrollListener, setScrollListener] = useState<() => void>(() => undefined);
    return (
        <EndlessScrollContext.Provider value={{
            scrollListener,
            setScrollListener: (listener) => setScrollListener(() => listener)
        }}>
            <div className={className} onScroll={scrollListener}>
                {children}
            </div>
        </EndlessScrollContext.Provider>
    );
}