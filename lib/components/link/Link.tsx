import {Link as FoundLink, LinkInjectedProps} from "found"
import {route} from "./route.ts";
import {ComponentType, ElementType} from "react";

export class Link
<
    TInner extends ElementType = never,
    TInnerWithActivePropName extends ComponentType<
        LinkInjectedProps & { [activePropName in TActivePropName]: boolean }
    > = never,
    TActivePropName extends string = never,
> extends FoundLink
{
    render() {
        return (
            <FoundLink<TInner, TInnerWithActivePropName, TActivePropName> {...this.props} to={route(this.props.to)}>
                {this.props.children}
            </FoundLink>
        )
    }
}
