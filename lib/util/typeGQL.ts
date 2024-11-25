import {GraphQLTaggedNode} from "relay-runtime";

export type TypedGQL<T> = T & 'masked data'

export const typeGQL = <T extends object | void>(
    gqlNode: T extends void ? 'Type is missing' & GraphQLTaggedNode : GraphQLTaggedNode
) => {
    return gqlNode as TypedGQL<T>
}

export const untypeGQL = (gqlNode: TypedGQL<unknown>) => {
    // @ts-expect-error: This type conversion is only for passing the query type together with the node
    return gqlNode as GraphQLTaggedNode
}
