import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";

type Props<T> = {
    title: string,
    options: T[],
    value?: T,
    defaultValue?: T,
    onChange?: (newValue: T) => void,
    description?: string
    required?: boolean
    optionToValue?: (o: T) => string
    optionToTitle?: (o: T) => string
};

export function SelectInput<T>({
    title, options, value: selection, defaultValue, onChange, description, required,
    optionToValue = (v) => v as string, optionToTitle = (v) => v as string
}: Props<T>) {
    const inputId = nameToId(title);

    const safeOptionToString = (name: string, converter: (v: T) => string) => (v: T) => {
        const str = converter(v)
        // this is done because one could forget to pass option-converter-props and then pass something other
        // than strings as options
        if (typeof str === "string") {
            return str; // Safe to return v as string
        }
        throw new Error(`${name}-prop must be provided because options aren't strings`);
    }

    const safeOptionToValue = (v: T) =>
        safeOptionToString('optionToValue', optionToValue)(v)
    ;

    const safeOptionToTitle = (v: T) =>
        safeOptionToString('optionToTitle', optionToTitle)(v)
    ;

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
                value={selection ? optionToValue(selection) : undefined}
                onChange={(e) => onChange?.(e.currentTarget.value as T)}
                defaultValue={defaultValue ? safeOptionToValue(defaultValue) : undefined}
                required={required}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
            >
                <option hidden disabled value="">Bitte auswählen</option>
                {options.map((v, i) =>
                    <option key={i} value={safeOptionToValue(v)}>{safeOptionToTitle(v)}</option>
                )}
            </select>
        </div>
    )
}
