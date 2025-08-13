import {HTMLAttributes} from "react";
import {clsx} from "clsx";

export const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={clsx(
                'px-3 py-2 rounded-md shadow-sm',
                'bg-indigo-600 hover:bg-indigo-500',
                'text-sm font-semibold text-white',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-indigo-600',
            )}
            onClick={props.onClick}
        >
            Retry
        </button>
    )
}