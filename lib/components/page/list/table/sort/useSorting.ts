import {SortKey} from "./SortKey.ts";
import {transformObjectMap} from "../../../../../util/util.ts";
import {usePrevious} from "../../../../../util/usePrevious.ts";
import {useEffect} from "react";
import {RefetchFnDynamic} from "react-relay";
import {OperationType} from "relay-runtime";
import {KeyType} from "react-relay/relay-hooks/helpers";
import {SortingCombination, useSortingCombination} from "./useSortingCombination.ts";
import {useRouter} from "../../../../../util/router/util.ts";

export type GenericSortingCombination = Record<string, string | null>
export type SortFunction<T = GenericSortingCombination> = (column: keyof T) => (order: SortKey | undefined) => void

export const sortingCombinationToQuery
    = (sortingCombination: SortingCombination) => transformObjectMap(sortingCombination, ([c, o]) => [c + 'Order', o])
;

export function useSorting<T>(refetch: RefetchFnDynamic<OperationType, KeyType>) {
    const {match, router} = useRouter()
    const sortingCombination = useSortingCombination<T>()
    const sortHeader = (key: keyof T) => ({sortKey: key})
    const sortingQuery = Object.entries(sortingCombination).map(([c, o]) => ({[c]: o}))

    const sort: SortFunction<T> = (column: keyof T) => (order: SortKey | undefined) => {
        let newOrderCombination = sortingCombination
        if (order) {
            newOrderCombination = {...sortingCombination, [column]: order}
        } else {
            delete newOrderCombination[column]
        }
        router.replace({
            pathname: '/' + (window.location.pathname.split('/').pop() ?? ''),
            query: sortingCombinationToQuery(newOrderCombination)
        })
    }

    // The previous pathname must be compared because otherwise a refetch can be triggered on the previous pathname with
    // a new incompatible sortingQuery. This can happen when navigating between different pages.
    const previousPathname = usePrevious(match.location.pathname)

    const previousSortingQuery = usePrevious(sortingQuery)
    useEffect(() => {
        if (
            JSON.stringify(sortingQuery) !== JSON.stringify(previousSortingQuery)
            && (match.location.pathname === previousPathname || !previousPathname)
        ) {
            refetch({order: sortingQuery})
        }
    }, [sortingQuery])

    return {sortingCombination, sortingQuery, sort, sortHeader}
}
