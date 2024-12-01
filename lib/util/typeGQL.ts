import {GraphQLTaggedNode} from "relay-runtime";

export type TypedGQL<T> = T & {mask: 'typed graphql node'}

export const typeGQL = <T extends object | void>(
    gqlNode: T extends void ? 'Type is missing' & GraphQLTaggedNode : GraphQLTaggedNode
) => {
    // @ts-expect-error: This type conversion is only for passing the query type together with the node
    return gqlNode as TypedGQL<T>
}

export const untypeGQL = <T extends object>(gqlNode: TypedGQL<T>): GraphQLTaggedNode => {
    return gqlNode as GraphQLTaggedNode
}
