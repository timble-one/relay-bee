import {useRouter} from "found";
import {SortKey} from "../SortKey.ts";
import {SortFunction} from "./useSorting.ts";
import qs from "qs";

export const useSortingFunction = <T>(sortingCombination: Partial<Record<keyof T, SortKey>>): SortFunction<T> => {
    const {router, match} = useRouter()
    return (column: keyof T) => (order: SortKey | undefined) => {
        const newOrderCombination = {...sortingCombination}
        if (order) {
            newOrderCombination[column] = order
        } else {
            delete newOrderCombination[column]
        }
        const query = nextQuery(match.location.search, newOrderCombination)
        const pathname = match.location.pathname
        router.replace(query ? `${pathname}?${query}` : pathname)
    }
}

const nextQuery = <T>(search: string, sortingCombination: Partial<Record<keyof T, SortKey>>) => {
    const currentQuery = qs.parse(search ?? '', {ignoreQueryPrefix: true})
    const nextQuery: { [key: string]: unknown; order?: typeof sortingCombination } = {
        ...currentQuery,
        order: sortingCombination
    }
    if (!Object.keys(sortingCombination).length) {
        delete nextQuery.order
    }
    return qs.stringify(nextQuery, {encode: false})
}
