import {createContext} from "react";

type Context = {
    refetchNeeded: boolean,
    setRefetchNeeded: (refetch: boolean) => void
};

export const RefetchListContext = createContext<Context>(
    {refetchNeeded: false, setRefetchNeeded: () => undefined}
);