import {ComponentProps} from "react";
import {twMerge} from "tailwind-merge";
import {Link} from "./Link.tsx";

export const TextLink = (props: ComponentProps<typeof Link>) =>
    <Link
        {...props}
        className={twMerge('text-teal-700 hover:text-teal-400', props.className)}
    >
        {props.children}
    </Link>
