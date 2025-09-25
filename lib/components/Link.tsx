import {Link as FoundLink, LocationDescriptor} from "found";
import {ReactNode} from "react";
import {useRoute} from "../util/router/util.ts";
import {apply} from "tssentials";

export const Link = (props: {
    to: LocationDescriptor,
    children: ReactNode,
    target?: string,
    className?: string,
}) => {
    const {className, children, to} = props
    const route = useRoute()
    const url = apply(to.toString(), u =>
        u.startsWith('http') ? u : route(to))
    return props.target === '_blank'
        ?
            <a
                className={className}
                href={url.toString()}
                target="_blank"
            >
                {children}
            </a>
        :
            <FoundLink to={url} className={className}>
                {children}
            </FoundLink>
}
