import {Link as FoundLink, LocationDescriptor} from "found";
import {ReactNode} from "react";
import {clsx} from "clsx";
import {useRoute} from "../util/router/util.ts";

export const Link = (props: {
    to: LocationDescriptor,
    children: ReactNode,
    target?: string,
    className?: string
}) => {
    const route = useRoute()
    const className = clsx('underline', props.className)
    const url = route(props.to)
    return props.target === '_blank'
        ?
            <a
                className={className}
                href={url.toString()}
                target="_blank"
            >
                {props.children}
            </a>
        :
            <FoundLink to={url} className={className}>
                {props.children}
            </FoundLink>
}
