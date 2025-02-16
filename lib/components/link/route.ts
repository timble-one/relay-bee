import {LocationDescriptor} from "found";
import {useRoute} from "../../util/router/util.ts";

export const route = (relativePath: LocationDescriptor) => {
    const route = useRoute()
    return route(relativePath)
}