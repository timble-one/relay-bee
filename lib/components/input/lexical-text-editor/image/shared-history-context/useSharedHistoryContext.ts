import {useContext} from "react";
import {SharedHistoryContext, SharedHistoryContextShape} from "./SharedHistoryContext.tsx";

export const useSharedHistoryContext = (): SharedHistoryContextShape => {
    return useContext(SharedHistoryContext);
};