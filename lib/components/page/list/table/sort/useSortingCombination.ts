import {SortKey, sortKeys} from "./SortKey.ts";
import {GenericSortingCombination} from "./useSorting.ts";
import {useRouter} from "../../../../../util/router/util.ts";
import qs from "qs";

export type SortingCombination<T = GenericSortingCombination> = Partial<Record<keyof T, SortKey>>

export const useSortingCombination = <T>(): SortingCombination<T> => {
    const {match} = useRouter()
    const orderParams = Array.from(Object.entries(qs.parse(match.location.query)['order'] ?? {}))
        .filter(([, v]) => sortKeys.includes(v as SortKey))
        .map(([c, o]) => [c, o])
    return orderParams.length
        ? Object.fromEntries(orderParams)
        : {}
}
