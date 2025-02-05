import React from "react";
import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";
import clsx from "clsx";

type Props = {
    title: string,
    value?: number | null,
    onChange?: (newValue: number) => void,
    onError?: (message: string) => void,
    description?: string,
    required?: boolean,
    min?: number,
    step?: number,
    unit?: string,
};

export function NumberInput(
    {title, value, onChange = () => undefined, description, required, min, step, unit}: Props) {
    const onStringChange = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(Number(e.currentTarget.value));
    }
    const inputId = nameToId(title);
    return (
        <div className="flex flex-col gap-2 col-span-3 xl:col-span-2 2xl:col-span-1">
            <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="flex gap-2 items-center">
                <div className="relative rounded-md shadow-sm grow">
                    <input
                        id={inputId}
                        type="number"
                        min={min}
                        step={step}
                        value={value ?? ''}
                        onChange={onStringChange}
                        required={required}
                        className={clsx(
                            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                            description ? 'pl-3 pr-10' : 'p-3',
                        )}
                    />
                    {description &&
                      <TooltipIcon iconClasses="absolute inset-y-0 right-0 flex items-center pr-3">
                          {description}
                      </TooltipIcon>
                    }
                </div>
                {unit && <label className="text-sm">{unit}</label>}
            </div>
        </div>
    )
}
