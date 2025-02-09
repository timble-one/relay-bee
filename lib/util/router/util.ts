import {useEnv} from "../environment/useEnv.ts";
import {LocationDescriptor, useRouter as useFoundRouter} from "found";

export const useRoute = () => {
    const {adminBasePath} = useEnv()
    return (relativePath: LocationDescriptor) => prependToRoute(adminBasePath, relativePath)
}

export const useRouter = () => {
    const route = useRoute()
    const {match, router} = useFoundRouter()
    return {match, router: {
        push: (path: LocationDescriptor) => router.push(route(path)),
        replace: (path: LocationDescriptor) => router.replace(route(path)),
        go: (delta: number) => router.go(delta),
    }}
}

const prependToRoute = (prefix: string, location: LocationDescriptor): LocationDescriptor => {
    if (typeof location === 'string') {
        return prefix + location
    } else {
        return {...location, pathname: prefix + location.pathname}
    }
}
