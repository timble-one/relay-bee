import {ReactNode} from "react";
import * as React from "react";

type Props = {
    children: ReactNode,
    onClick: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement>,
    ) => void
}

export const Button = ({children, onClick}: Props) => {
    return (
        <div
            className="size-8 flex items-center"
            role="button"
            tabIndex={0}
            onMouseDown={e => e.preventDefault()}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
