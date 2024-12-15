import {EntityDescription} from "../../../EntityDescription.tsx";
import {sortingCombinationToQuery} from "./table/sort/useSorting.ts";

type Defined<T> = {[K in keyof T]: Exclude<T[K], undefined>}

const filterDefinedValues = <K extends string | number | symbol, V>(record: Record<K, V>) =>
    (Object.fromEntries(Object.entries(record).filter(([, v]) => v !== undefined)) as Defined<Record<K, V>>)
;

export const getDefaultListRoute = (entityDescription: EntityDescription<unknown>) => {
    const path = `/${entityDescription.handle}`
    const query = entityDescription.defaultSorting && sortingCombinationToQuery(entityDescription.defaultSorting)
    const searchParams = query && new URLSearchParams(filterDefinedValues(query))
    return searchParams ? `${path}?${searchParams}` : path
}