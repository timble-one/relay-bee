import {GraphQLTaggedNode} from "relay-runtime";

export type TypedGql<T> = T & 'masked data'

export const typeGql = <T extends object | void>(
    query: T extends void ? 'Type is missing' & GraphQLTaggedNode : GraphQLTaggedNode
) => {
    return query as TypedGql<T>
}

export const untypeGql = (query: TypedGql<unknown>) => {
    // @ts-expect-error: This type conversion is only for passing the query type together with the node
    return query as GraphQLTaggedNode
}
