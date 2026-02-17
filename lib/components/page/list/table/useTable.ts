import {RefetchFnDynamic} from "react-relay";
import {OperationType} from "relay-runtime";
import {KeyType} from "react-relay/relay-hooks/helpers";
import {useSorting} from "./sort/useSorting/useSorting.ts";
import {useRefetchListContext} from "../../refetch-list-context/useRefetchListContext.ts";

export const useTable = <T>(refetch: RefetchFnDynamic<OperationType, KeyType>) => {
    const {sortingCombination, sortingQuery, sort, sortHeader} = useSorting<T>(refetch)
    useRefetchListContext({order: sortingQuery}, refetch)
    return {sortingCombination, sort, sortHeader}
}
