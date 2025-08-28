import {type JSX, ReactNode, useMemo} from "react";
import {createEmptyHistoryState} from "@lexical/react/LexicalHistoryPlugin";
import {SharedHistoryContext} from "./SharedHistoryContext";

export const SharedHistoryContextProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const historyContext = useMemo(
        () => ({historyState: createEmptyHistoryState()}),
        [],
    );
    return <SharedHistoryContext.Provider value={historyContext}>{children}</SharedHistoryContext.Provider>;
};