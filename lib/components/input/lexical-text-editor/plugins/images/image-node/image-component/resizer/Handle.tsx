import {HTMLProps} from "react";
import {clsx} from "clsx";

export const Handle = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <div {...props} className={clsx(
            'block w-2 h-2 absolute bg-blue-500 border border-solid border-white',
            props.className
        )}>
            {props.children}
        </div>
    )
}