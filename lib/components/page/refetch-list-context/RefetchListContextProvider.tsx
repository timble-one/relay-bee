import {ReactNode, useState} from "react";
import {RefetchListContext} from "./RefetchListContext.ts";

export function RefetchListContextProvider({children}: {children: ReactNode}) {
    const [refetchNeeded, setRefetchNeeded] = useState<boolean>(false);
    return (
        <RefetchListContext.Provider value={{refetchNeeded: refetchNeeded, setRefetchNeeded: setRefetchNeeded}}>
            {children}
        </RefetchListContext.Provider>
    )
}