import {RecursiveOmit, removePropsRecursive} from "../props.ts";
import {ifPresent} from "tssentials";

export type ExtractNodeFromEdges<
    T extends {
        readonly edges: readonly ({readonly node: unknown} | undefined | null)[] | undefined | null
    } | undefined | null
>
    = NonNullable<NonNullable<NonNullable<NonNullable<T>['edges']>[number]>['node']>
;

const relayProps = ['__id', '__fragmentOwner', '__fragments', ' $fragmentType'] as const
export const removeRelayProps = <T>(obj: T): RecursiveOmit<T, typeof relayProps[number]> => {
    return removePropsRecursive(obj, relayProps)
}

export const forwardFragmentSpreads = <T,>(oldData: {" $fragmentSpreads": T} | null | undefined, newData: object) =>
    ifPresent(oldData, oldData => ({...newData, " $fragmentSpreads": oldData[" $fragmentSpreads"]}))
