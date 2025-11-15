import {twMerge} from "tailwind-merge";

type Option<T> = {value: T, name: string}

type Props<T> = {
    options: Option<T>[]
    value?: string | null
    onChange?: (newValue: T) => void
    required?: boolean
    inputId: string
    addMode?: boolean
}

/** on second-next major we can rename this to SelectInput (after removal of SelectInput) **/
export const SelectFieldInput = <T extends string>(props: Props<T>) => {
    const {required, value} = props
    return (
        <select
            id={props.inputId}
            value={value ?? ''}
            onChange={(e) => props.onChange?.(e.currentTarget.value as T)}
            required={required}
            className={twMerge(
                'block w-full py-1.5 rounded-md border-0 shadow-sm',
                'text-gray-900 sm:text-sm/6',
                'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
            )}
        >
            <option hidden={required} disabled={required} value="">
                {props.addMode
                    ? 'Hinzufügen'
                    : required ? 'Bitte auswählen' : 'keine(r)'
                }
            </option>
            {props.options.map(({value, name}, i) =>
                <option key={i} value={value}>{name}</option>
            )}
        </select>
    )
}