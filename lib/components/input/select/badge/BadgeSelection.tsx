import {ComponentProps} from "react";
import {Badge} from "./Badge.tsx";
import {InputLabel} from "../../InputLabel.tsx";
import {SelectFieldInput} from "../SelectFieldInput.tsx";
import {nameToId} from "../../../../util/util.ts";

type SelectProps<T extends string> = ComponentProps<typeof SelectFieldInput<T>>

type Props<T extends string> = {
    title: string
    options: SelectProps<T>['options']
    selected: string[]
    onChange: (value: string[]) => void
}

export const BadgeSelection = <T extends string>(props: Props<T>) => {
    const {title, selected, onChange} = props
    const inputId = nameToId(title)
    const selectedOptions = props.options.filter(o => selected.includes(o.value))
    return (
        <div className="flex flex-col gap-2 col-span-6 2xl:col-span-3">
            <InputLabel inputId={inputId}>{title}</InputLabel>
            <SelectFieldInput<T>
                options={props.options}
                inputId={inputId}
                onChange={v => selected.includes(v) || onChange([...selected, v])}
                addMode
            />
            <div className="flex flex-wrap gap-2">
                {selectedOptions.map((o, i) =>
                    <Badge
                        key={i}
                        onClickCross={() => onChange(selected.filter(r => o.value !== r))}
                    >
                        {o.name}
                    </Badge>
                )}
            </div>
        </div>
    )
}
