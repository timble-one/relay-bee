import {createFarceRouter, RouteConfig} from "found";
import {ComponentType} from "react";
import {GraphQLTaggedNode} from "relay-runtime";
import {BrowserProtocol, queryMiddleware} from "farce";

export const createRouter = (routes: RouteConfig) =>
    createFarceRouter({
        historyProtocol: new BrowserProtocol(),
        historyMiddlewares: [queryMiddleware],
        routeConfig: routes,
})

export type RelayableRouteObject<VARIABLES> = {
    children?: RouteConfig | Record<string, RouteConfig>
    Component?: ComponentType<unknown>
    path?: string
    query?: GraphQLTaggedNode
    prepareVariables?: (params: Record<string, string>) => VARIABLES
}

export const createRouteConfig = (routeConfig: RelayableRouteObject<unknown>[]): RouteConfig => {
    return routeConfig.map(c => ({
        ...c,
        fetchPolicy: 'store-or-network',
        children: c.children && (Array.isArray(c.children)
                ? createRouteConfig(c.children)
                : Object.fromEntries(Object.entries(c.children).map(([k, v]) => ([k, createRouteConfig(v)])))
        )
    }))
}
