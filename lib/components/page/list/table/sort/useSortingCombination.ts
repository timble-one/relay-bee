import {useRouter} from "found";
import {SortKey, sortKeys} from "./SortKey.ts";
import {GenericSortingCombination} from "./useSorting.ts";

export type SortingCombination<T = GenericSortingCombination> = {[p in keyof T]?: SortKey}

type SearchParamsArray = [string, string][]

export const useSortingCombination = <T>(): SortingCombination<T> => {
    const {match} = useRouter()
    const searchParamArray: SearchParamsArray = Array.from(Object.entries(match.location.query))
    const orderParams = searchParamArray
        .filter(([k, v]) => k.endsWith('Order') && sortKeys.includes(v as SortKey))
        .map(([c, o]) => [c.split('Order')[0], o])
    ;
    if (orderParams.length) {
        return Object.fromEntries(orderParams)
    }
    return {}
}