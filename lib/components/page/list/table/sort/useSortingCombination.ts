import {SortKey, sortKeys} from "./SortKey.ts";
import {GenericSortingCombination} from "./useSorting/useSorting.ts";
import {useRouter} from "../../../../../util/router/util.ts";
import qs from "qs";

export type SortingCombination<T = GenericSortingCombination> = Partial<Record<keyof T, SortKey>>

export const useSortingCombination = <T>(): SortingCombination<T> => {
    const {match} = useRouter()

    // Found parses location.query with query-string, which flattens nested keys like
    // order[state]=ASC into { 'order[state]': 'ASC' } and can reorder them. Parsing the
    // raw search string with qs preserves the original criterion order from the URL.
    const orderParams =
        Array.from(Object.entries(
            qs.parse(
                match.location.search,
                {ignoreQueryPrefix: true}
            )['order'] ?? {}
        ))
        .filter(([, v]) => sortKeys.includes(v as SortKey))
        .map(([c, o]) => [c, o])

    return orderParams.length
        ? Object.fromEntries(orderParams)
        : {}
}
