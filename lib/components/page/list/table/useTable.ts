import {SortingCombination, useSorting} from "./sort/useSorting.ts";
import {useLazyLoadQuery} from "react-relay";
import {GraphQLTaggedNode, OperationType} from "relay-runtime";
import {KeyType} from "react-relay/relay-hooks/helpers";

type Props<SORTING_ORDER> = {
    query: GraphQLTaggedNode,
    defaultSortingCombination: SortingCombination<SORTING_ORDER>,
}

export function useTable<
    DATA_KEY extends KeyType, QUERY extends {response: DATA_KEY} & OperationType, SORTING_ORDER
>({query, defaultSortingCombination}: Props<SORTING_ORDER>) {
    const {sortingQuery, sortingCombination, sort} = useSorting<SORTING_ORDER>({
        defaultSortingCombination,
    })
    const data: DATA_KEY = useLazyLoadQuery<QUERY>(
        query, {order: sortingQuery}
    )
    const sortHeader = (key: keyof SORTING_ORDER) => ({sortKey: key})
    return {data, sortingQuery, sortingCombination, sort, sortHeader}
}
