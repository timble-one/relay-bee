import {nameToId} from "../../util/util.ts";
import clsx from "clsx";
import TooltipIcon from "../icon/TooltipIcon.tsx";

type Type = 'date' | 'datetime-local'

type Props = {
    title: string,
    value?: string | null,
    onChange?: (newValue: string) => void,
    description?: string
    required?: boolean
    type?: Type
};

export function DateTimeInput(
    {
        title,
        value,
        description,
        onChange = () => undefined,
        required = false,
        type = 'datetime-local'
    }: Props
) {
    value = value && parseValue(value, type)
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
                    type={type}
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

function parseValue(value: string, type: Type) {
    // example: 1010-10-10T00:00:00+00:00
    const parsedValue = value.match(/(?<date>\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/)
    if (
        type === 'date'
        && parsedValue?.groups
        && 'date' in parsedValue.groups
        && typeof parsedValue.groups.date === 'string'
    ) {
        value = parsedValue.groups.date
    }
    return value
}

/**
 * @deprecated: use DateTimeInput instead
 */
export function DateInput(props: Props) {
    return (
        <DateTimeInput {...props}/>
    )
}
