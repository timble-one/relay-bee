import {nameToId} from "../../../util/util.ts";
import {SelectFieldInput} from "./SelectFieldInput.tsx";
import {InputLabel} from "../InputLabel.tsx";
import {ComponentProps} from "react";

type InputProps<T extends string> = ComponentProps<typeof SelectFieldInput<T>>

type Props<T extends string> = {
    title: string
    description?: string
    options: InputProps<T>['options']
    value?: InputProps<T>['value']
    onChange?: InputProps<T>['onChange']
    required?: InputProps<T>['required']
}

export const SelectField = <T extends string>(props: Props<T>) => {
    const {title, description} = props
    const inputId = nameToId(title)
    return (
        <div className="col-span-6 2xl:col-span-3 flex flex-col gap-2">
            <InputLabel inputId={inputId} description={description}>{title}</InputLabel>
            <SelectFieldInput<T>
                options={props.options}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                inputId={inputId}
            />
        </div>
    )
}
