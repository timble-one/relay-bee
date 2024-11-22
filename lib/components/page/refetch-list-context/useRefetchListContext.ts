import {useContext, useEffect} from "react";
import {OperationType, Variables} from "relay-runtime";
import {RefetchFnDynamic} from "react-relay";
import {KeyType} from "react-relay/relay-hooks/helpers";
import {RefetchListContext} from "./RefetchListContext.ts";

export function useRefetchListContext(variables: Variables, refetch: RefetchFnDynamic<OperationType, KeyType>) {
    const refetchListContext = useContext(RefetchListContext);
    useEffect(() => {
        if (refetchListContext.refetchNeeded) {
            refetchListContext.setRefetchNeeded(false);
            refetch(variables, {fetchPolicy: 'store-and-network'});
        }
    }, [refetchListContext, variables, refetch]);
}