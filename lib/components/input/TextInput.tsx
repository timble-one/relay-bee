import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";
import {HTMLInputTypeAttribute} from "react";

type Props = {
    title: string,
    value?: string | null,
    onChange?: (newValue: string) => void,
    description?: string
    required?: boolean
    type?: HTMLInputTypeAttribute
};

export function TextInput({title, value, onChange = () => undefined, description, required, type}: Props) {
    const inputId = nameToId(title);
    return (
        <div className="col-span-full xl:col-span-3 2xl:col-span-2">
            <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    id={inputId}
                    type={type ?? 'text'}
                    required={required}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    autoComplete="off"
                    className="pl-3 pr-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {description &&
                    <TooltipIcon iconClasses="absolute inset-y-0 right-0 flex items-center pr-3">
                        {description}
                    </TooltipIcon>
                }
            </div>
        </div>
    )
}
