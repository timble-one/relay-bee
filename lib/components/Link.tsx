import {useRoute} from "../util/router/util.ts";
import {Link as FoundLink, LocationDescriptor} from "found"
import {ReactNode} from "react";

type Props = {children: ReactNode, to: LocationDescriptor, className?: string}

export const Link = ({children, to, className}: Props) => {
    const route = useRoute()
    return (
        <FoundLink to={route(to)} className={className}>
            {children}
        </FoundLink>
    )
}