import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";

type Option = {value: string, name: string}

type Props = {
    title: string,
    options: Option[],
    value?: string,
    onChange?: (newValue: string) => void,
    description?: string
    required?: boolean
};

export function SelectInput<T extends string>({
    title, options, value, onChange, description, required
}: Props) {
    const inputId = nameToId(title);
    return (
        <div className="sm:col-span-3 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <label htmlFor={inputId} className="block text-sm/6 font-medium text-gray-900">
                    {title}
                </label>
                {description &&
                  <TooltipIcon>
                      {description}
                  </TooltipIcon>
                }
            </div>
            <select
                id={inputId}
                value={value ?? ''}
                onChange={(e) => onChange?.(e.currentTarget.value as T)}
                required={required}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
            >
                <option hidden={required} disabled={required} value="">
                    {required ? 'Bitte auswählen' : 'keine(r)'}
                </option>
                {options.map(({value, name}, i) =>
                    <option key={i} value={value}>{name}</option>
                )}
            </select>
        </div>
    )
}
