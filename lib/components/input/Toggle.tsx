import {Switch} from "@headlessui/react";
import TooltipIcon from "../icon/tooltip-icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";
import {InputLabel} from "./InputLabel.tsx";

type Props = {
    title: string,
    value: boolean | undefined,
    onChange?: (newValue: boolean) => void,
    description?: string
};

export function Toggle({title, value, onChange: onChange = () => undefined, description}: Props) {
    const inputId = nameToId(title);
    return (
        <div className="col-span-4 xl:col-span-3 2xl:col-span-2 max-w-xs">
            <InputLabel inputId={inputId}>{title}</InputLabel>
            <div className="mt-2 flex flex-row gap-4 items-center h-9">
                <Switch
                    checked={value ?? false}
                    onChange={onChange}
                    id={inputId}
                    className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                    />
                </Switch>
                {description &&
                  <TooltipIcon>{description}</TooltipIcon>}
            </div>
        </div>
    )
}
