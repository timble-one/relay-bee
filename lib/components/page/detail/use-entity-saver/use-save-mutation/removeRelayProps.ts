import {RecursiveOmit, removePropsRecursive} from "../../../../../util/props"

const relayProps = ['__id', '__fragmentOwner', '__fragments', ' $fragmentType'] as const

type RelayProp = typeof relayProps[number]
export type Stripped<T> = RecursiveOmit<T, RelayProp>

export const removeRelayProps = <T extends Record<string, unknown>>(obj: T): Stripped<T> => {
    return removePropsRecursive(obj, relayProps)
}
