import {nameToId} from "../../util/util.ts";
import clsx from "clsx";
import TooltipIcon from "../icon/TooltipIcon.tsx";

type Props = {
    title: string,
    value?: string | null,
    onChange?: (newValue: string) => void,
    description?: string
    required?: boolean
};

export function DateInput({title, value, onChange = () => undefined, description, required = false}: Props) {
    const inputId = nameToId(title);
    const dateWithoutTimezone = value?.split('+')[0];
    return (
        <div className="col-span-2 2xl:col-span-1 max-w-xs">
            <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    required={required}
                    id={inputId}
                    type="datetime-local"
                    value={dateWithoutTimezone ?? ''}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className={clsx(description ? 'pl-3 pr-10' : 'p-3', 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6')}
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
