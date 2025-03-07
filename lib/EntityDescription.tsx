import {SortingCombination} from "./components/page/list/table/sort/useSortingCombination.ts";

export type EntityDescription<SORTING_ORDER = never> = {
    title: {
        singular: string,
        plural: string,
        demonstrativPronoun: string
    },
    handle: string
    defaultSorting?: SortingCombination<SORTING_ORDER>
}