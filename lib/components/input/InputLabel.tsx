import {ifPresent} from "tssentials";
import TooltipIcon from "../icon/tooltip-icon/TooltipIcon.tsx";

type Props = {
    children: string
    description?: string
    inputId?: string
}

export const InputLabel = (props: Props) => {
    return (
        <div className="flex flex-row gap-2">
            <label htmlFor={props.inputId} className="block text-sm/6 font-medium text-gray-900">
                {props.children}
            </label>
            {ifPresent(props.description, d =>
                <TooltipIcon>{d}</TooltipIcon>
            )}
        </div>
    )
}