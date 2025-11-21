import {SortingCombination} from "./useSortingCombination.ts";
import qs from "qs";

export const queryString = (props: {order: SortingCombination}) =>
    qs.stringify({order: props.order}, {encode: false})
