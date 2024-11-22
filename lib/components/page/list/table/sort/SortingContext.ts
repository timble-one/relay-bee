import {createContext} from "react";
import {SortingCombination, SortFunction} from "./useSorting.ts";

type SortingContext = {
    sortingCombination: SortingCombination,
    sort: SortFunction
}

export const SortingContext = createContext<SortingContext | undefined>(undefined);
