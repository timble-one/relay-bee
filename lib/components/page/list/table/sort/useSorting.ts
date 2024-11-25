import {SortKey, sortKeys} from "./SortKey.ts";
import {transformObjectMap} from "../../../../../util/util.ts";
import {useRouter} from "found";
import {useEffect, useState} from "react";

export type SortingCombination<T = Record<string, unknown>> = {[p in keyof T]?: SortKey}
export type SortFunction<T = Record<string, unknown>> = (column: keyof T) => (order: SortKey | undefined) => void
type SearchParamsArray = [string, string][]

type Props<T> = {
    defaultSortingCombination: SortingCombination<T>
}

export function useSorting<T>(
    {defaultSortingCombination}: Props<T>
) {
    const {match, router} = useRouter()
    const searchParamArray: SearchParamsArray = Array.from(Object.entries(match.location.query))

    // the default sorting is disabled as soon as the order changed manually
    // otherwise the sorting behaviour can feel weird
    const [enableDefault, setEnableDefault] = useState(true)

    const getSortingCombination = (searchParams: SearchParamsArray): SortingCombination<T> => {
        const orderParams = searchParams
            .filter(([k, v]) => k.endsWith('Order') && sortKeys.includes(v as SortKey))
            .map(([c, o]) => [c.split('Order')[0], o])
        ;
        if (orderParams.length) {
            return Object.fromEntries(orderParams)
        } else if (enableDefault) {
            return defaultSortingCombination
        }
        return {};
    };

    const sortingCombination = getSortingCombination(searchParamArray)

    const sort: SortFunction<T> = (column: keyof T) => (order: SortKey | undefined) => {
        let newOrderCombination = sortingCombination
        if (order) {
            newOrderCombination = {...sortingCombination, [column]: order}
        } else {
            delete newOrderCombination[column];
        }
        router.replace({
            pathname: match.location.pathname,
            query: transformObjectMap(newOrderCombination, ([c, o]) => [c + 'Order', o])
        })
    };

    useEffect(() => {
        if (enableDefault && sortingCombination != defaultSortingCombination) {
            setEnableDefault(false)
        }
    }, [defaultSortingCombination, enableDefault, sortingCombination])

    const sortingQuery = Object.entries(sortingCombination).map(([c, o]) => ({[c]: o}));
    return {sortingCombination, sortingQuery, sort}
}
