import {sanitizeUrl} from "../../../utils/url.ts";
import {Button} from "./Buttons.tsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {KeyboardEvent, MouseEvent} from "react";
import {ifPresent} from "tssentials";

type Props = {
    value?: string
    onClickEdit: (event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLElement>) => void
    onClickDelete: () => void
}

export const LinkPreview = (props: Props) => {
    return (
        <>
            <a
                href={ifPresent(props.value, v => sanitizeUrl(v))}
                target="_blank"
                rel="noopener noreferrer"
                className="grow underline text-blue-500"
            >
                {props.value}
            </a>
            <div className="flex">
                <Button onClick={props.onClickDelete}>
                    <TrashIcon className="size-6"/>
                </Button>
                <Button onClick={props.onClickEdit}>
                    <PencilIcon className="size-6"/>
                </Button>
            </div>
        </>
    )
}
