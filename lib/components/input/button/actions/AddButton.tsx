import {PlusIcon} from "@heroicons/react/20/solid";
import {Button} from "./Button.tsx";

export const AddButton = (props: {onClick: () => void}) => {
    return (
        <Button
            onClick={props.onClick}
            icon={<PlusIcon className={Button.Icon.getTailwindClasses()} />}
        >
            Hinzufügen
        </Button>
    )
}
