import {createContext} from "react";
import {SortFunction} from "./useSorting.ts";
import {SortingCombination} from "./useSortingCombination.ts";

type SortingContext = {
    sortingCombination: SortingCombination,
    sort: SortFunction
}

export const SortingContext = createContext<SortingContext | undefined>(undefined);
