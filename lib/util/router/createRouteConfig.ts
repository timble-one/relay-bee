import {RouteConfig} from "found";
import {ComponentType} from "react";
import {GraphQLTaggedNode} from "relay-runtime";

export type RBeeRouteObject<VARIABLES> = {
    children?: RouteConfig | Record<string, RouteConfig>
    Component?: ComponentType<unknown>
    path?: string
    query?: GraphQLTaggedNode
    prepareVariables?: (params: Record<string, string>) => VARIABLES
}

export const createRouteConfig = (routeConfig: RBeeRouteObject<unknown>[]): RouteConfig => {
    return routeConfig.map(c => ({
        ...c,
        fetchPolicy: 'store-or-network',
        children: c.children && (Array.isArray(c.children)
                ? createRouteConfig(c.children)
                : Object.fromEntries(Object.entries(c.children).map(([k, v]) => ([k, createRouteConfig(v)])))
        )
    }))
}