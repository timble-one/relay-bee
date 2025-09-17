import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = (props: Props) => {
    return (
        <button {...props} type="button">
            {props.children}
        </button>
    )
}
