import {TrashIcon} from "@heroicons/react/20/solid";
import {Button} from "./Button.tsx";

export const DeleteButton = (props: {onClick: () => void}) => {
    return (
        <Button
            onClick={props.onClick}
            icon={<TrashIcon className={Button.Icon.getTailwindClasses()} />}
        >
            Löschen
        </Button>
    )
}
