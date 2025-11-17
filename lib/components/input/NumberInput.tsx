import React from "react";
import TooltipIcon from "../icon/TooltipIcon.tsx";
import {nameToId} from "../../util/util.ts";
import {InputLabel} from "./InputLabel.tsx";
import {twMerge} from "tailwind-merge";
import {ifPresent} from "tssentials";

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
}

export function NumberInput(props: Props) {
    const {title, description} = props
    const onStringChange = (e: React.FormEvent<HTMLInputElement>) => {
        ifPresent(props.onChange, c => c(Number(e.currentTarget.value)))
    }
    const inputId = nameToId(title)
    return (
        <div className="flex flex-col gap-2 col-span-6 xl:col-span-3 2xl:col-span-2">
            <InputLabel inputId={inputId}>{title}</InputLabel>
            <div className="flex gap-2 items-center">
                <div className="relative rounded-md shadow-sm grow">
                    <input
                        id={inputId}
                        type="number"
                        min={props.min}
                        step={props.step}
                        value={props.value ?? ''}
                        onChange={onStringChange}
                        required={props.required}
                        className={twMerge(
                            'block w-full py-1.5',
                            description && 'pl-3 pr-10',
                            'shadow-sm rounded-md border-0',
                            'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
                            'text-gray-900 sm:text-sm sm:leading-6 placeholder:text-gray-400',
                        )}
                    />
                    {description &&
                      <TooltipIcon iconClasses="absolute inset-y-0 right-0 flex items-center pr-3">
                          {description}
                      </TooltipIcon>
                    }
                </div>
                {ifPresent(props.unit, u =>
                    <label className="text-sm">{u}</label>)}
            </div>
        </div>
    )
}
