import {ReactNode} from "react";
import {useRoute} from "../util/router/util.ts";
import {Link as FoundLink, LocationDescriptor} from "found"

export const Link = ({children, to, className}: {children: ReactNode, to: LocationDescriptor, className?: string}) => {
    const route = useRoute();
    return (
        <FoundLink to={route(to)} className={className}>
            {children}
        </FoundLink>
    )
}