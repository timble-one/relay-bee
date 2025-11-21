import {EntityDescription} from "../../../EntityDescription.tsx";
import {queryString} from "./table/sort/queryString.ts";
import {ifPresent} from "tssentials";

export const getDefaultListRoute = (entityDescription: EntityDescription) => {
    const path = entityDescription.handle
    const query = ifPresent(entityDescription.defaultSorting, order =>
        '?' + queryString({order}))
    return '/' + path + query
}
