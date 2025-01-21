import {useEnv} from "./environment/useEnv.ts";

export const useBackendPath = (): (path: string) => string => {
    const env = useEnv()
    return (path: string) => env.httpEndpoint + path
}

export const useImagePath = (): (path: string, maxHeight?: number) => string => {
    const backendPath = useBackendPath()
    return (path, maxHeight) => {
        let maxHeightPath = path
        if (maxHeight) {
            const pathElements = path.split('.')
            pathElements[0] = pathElements[0] + '-mh' + maxHeight
            maxHeightPath = pathElements.join('.')
        }
        return backendPath(maxHeightPath)
    }
}
