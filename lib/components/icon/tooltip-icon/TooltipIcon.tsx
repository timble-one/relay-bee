import {QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import {ReactNode} from "react";
import {Tooltip} from "./Tooltip.tsx";

type Props = {children: ReactNode, iconClasses?: string};

export default function TooltipIcon({children: text, iconClasses}: Props) {
    return (
        <Tooltip text={text}>
            {({getReferenceProps, setReference}) => (
                <div className={iconClasses}>
                    <QuestionMarkCircleIcon ref={setReference} {...getReferenceProps()} aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                    />
                </div>
            )}
        </Tooltip>
    )
}
