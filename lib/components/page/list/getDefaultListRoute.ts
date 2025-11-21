import {EntityDescription} from "../../../EntityDescription.tsx";
import qs from 'qs';

export const getDefaultListRoute = (entityDescription: EntityDescription<unknown>) => {
    const path = `/${entityDescription.handle}`
    const query = qs.stringify({order: entityDescription.defaultSorting}, {encode: false})
    return query ? `${path}?${query}` : path
}
