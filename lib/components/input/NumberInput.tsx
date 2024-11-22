import React from "react";
import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";
import clsx from "clsx";

type Props = {
    title: string,
    value?: number | null,
    onChange?: (newValue: number) => void,
    onError?: (message: string) => void,
    description?: string
};

export function NumberInput(
    {title, value, onChange = () => undefined, description}: Props) {
    const onStringChange = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(Number(e.currentTarget.value));
    }
    const inputId = nameToId(title);
    return (
        <div className="sm:col-span-4 max-w-md">
            <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    id={inputId}
                    type="number"
                    value={value ?? ''}
                    onChange={onStringChange}
                    className={clsx(description ? 'pl-3 pr-10' : 'p-3',
                        'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6')}
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
