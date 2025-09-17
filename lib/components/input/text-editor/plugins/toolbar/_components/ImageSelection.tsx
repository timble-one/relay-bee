import {Button} from "./Button.tsx";
import {PhotoIcon} from "@heroicons/react/20/solid";
import {Dialog} from "../../../../../dialog/Dialog.tsx";
import {INSERT_IMAGE_COMMAND} from "../../images/INSERT_IMAGE_COMMAND.ts";
import {ComponentType, useState} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export type ImageSelection = (
    onSelect: (src: string) => void,
    onClose: () => void
) => ComponentType

type Props = {
    imageSelection: ImageSelection,
    iconClassName: string
}

export const ImageSelection = ({imageSelection, iconClassName}: Props) => {
    const [editor] = useLexicalComposerContext()
    const onSelectImage = (src: string) => {
        setImageSelectionOpen(false)
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src, altText: 'image'
        })
    }
    const [imageSelectionOpen, setImageSelectionOpen] = useState(false)
    const ImageSelection = imageSelection(onSelectImage, () => setImageSelectionOpen(false))
    return (
        <>
            <Button
                onClick={() => setImageSelectionOpen(true)}
                aria-label="Insert Image"
            >
                <PhotoIcon className={iconClassName} />
            </Button>
            <Dialog
                open={imageSelectionOpen}
                title="Bild auswählen"
                onClose={() => setImageSelectionOpen(false)}
            >
                <ImageSelection />
            </Dialog>
        </>
    )
}
