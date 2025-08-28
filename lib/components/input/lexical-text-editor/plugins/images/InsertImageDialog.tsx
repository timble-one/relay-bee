import {ImagePayload} from "../../image/image-node/ImageNode.tsx";
import {LexicalEditor} from "lexical";
import {JSX, useEffect, useRef} from "react";
import {INSERT_IMAGE_COMMAND} from "./INSERT_IMAGE_COMMAND.ts";

export type InsertImagePayload = Readonly<ImagePayload>

type Props = {
    activeEditor: LexicalEditor
    onClose: () => void
}

export const InsertImageDialog = ({activeEditor, onClose}: Props): JSX.Element => {
    const hasModifier = useRef(false)

    useEffect(() => {
        hasModifier.current = false
        const handler = (e: KeyboardEvent) => {
            hasModifier.current = e.altKey
        }
        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [activeEditor])

    const onClick = (payload: InsertImagePayload) => {
        activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
        onClose()
    }

    return (
        <>
            <h2>Image Selection</h2>
            <button onClick={() => onClick({
                src: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
                altText: 'image'
            })}>
                Bild einfügen
            </button>
        </>
    )
};