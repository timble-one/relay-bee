import {useRoute} from "../util/router/util.ts";
import {Link as FoundLink, LinkInjectedProps, LinkProps, LocationDescriptor} from "found"
import * as React from "react";

type Props<
    TInner extends React.ElementType = never,
    TInnerWithActivePropName extends React.ComponentType<
        LinkInjectedProps & { [activePropName in TActivePropName]: boolean }
    > = never,
    TActivePropName extends string = never,
> = {children: LinkProps<TInner, TInnerWithActivePropName, TActivePropName>['children'], to: LocationDescriptor, className?: string}

export const Link = <
    TInner extends React.ElementType = never,
    TInnerWithActivePropName extends React.ComponentType<
        LinkInjectedProps & { [activePropName in TActivePropName]: boolean }
    > = never,
    TActivePropName extends string = never,
>({children, to, className}: Props<TInner, TInnerWithActivePropName, TActivePropName>) => {
    const route = useRoute()
    return (
        <FoundLink<TInner, TInnerWithActivePropName, TActivePropName> to={route(to)} className={className}>
            {children}
        </FoundLink>
    )
}