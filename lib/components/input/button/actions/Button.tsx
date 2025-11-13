import {clsx} from "clsx";
import {ButtonHTMLAttributes, ReactNode} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode
}

export const Button = (props: Props) => {
    return (
        <div className="col-span-full">
            <button {...props}
                type={props.type ?? 'button'}
                className={clsx(
                    "inline-flex items-center gap-x-1.5 px-3 py-2 rounded-md shadow-sm",
                    "bg-teal-600 hover:bg-teal-500",
                    "text-sm font-semibold text-white",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-teal-600",
                    props.className
                )}
            >
                {props.icon}
                {props.children}
            </button>
        </div>
    )
}

Button.Icon = {getTailwindClasses: () => '-mr-0.5 size-5'}