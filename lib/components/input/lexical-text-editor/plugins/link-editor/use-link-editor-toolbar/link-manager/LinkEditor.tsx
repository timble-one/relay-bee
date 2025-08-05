import {clsx} from "clsx";
import {Button} from "./Buttons.tsx";
import {CheckIcon, FolderPlusIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {LegacyRef, KeyboardEvent, MouseEvent} from "react";

type Link = {
    url: string
    targetBlank: boolean
}

type Props = {
    value: Link
    inputRef: LegacyRef<HTMLInputElement>
    onChange: (value: Link) => void
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
    onCancel: () => void
    onSubmit: (event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLElement>) => void
}

const boxClasses = clsx(
    'block h-9',
    'rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300',
    'text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6',
    'focus:ring-2 focus:ring-inset focus:ring-indigo-600',
)


export const LinkEditor = (props: Props) => {
    const {value, onChange} = props
    return (
        <>
            <input
                ref={props.inputRef}
                className={clsx('link-input', boxClasses, 'grow')}
                value={value.url}
                onChange={(event) => onChange({...value, url: event.target.value})}
                onKeyDown={props.onKeyDown}
            />
            <div className={clsx(
                boxClasses,
                'flex items-center gap-2 p-2'
            )}>
                <input
                    type="checkbox"
                    checked={value.targetBlank}
                    onChange={() => onChange({...value, targetBlank: !value.targetBlank})}
                    className={clsx(
                        'col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white ',
                        'checked:border-indigo-600 checked:bg-indigo-600',
                        'indeterminate:border-indigo-600 indeterminate:bg-indigo-600',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                        'disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100',
                        'forced-colors:appearance-auto',
                    )}
                />
                <div title="in neuem Tab öffnen">
                    <FolderPlusIcon className="size-6"/>
                </div>
            </div>
            <div className="flex items-center">
                <Button onClick={props.onCancel}>
                    <XMarkIcon className="size-6"/>
                </Button>
                <Button onClick={props.onSubmit}>
                    <CheckIcon className="size-6"/>
                </Button>
            </div>
        </>
    )
}
