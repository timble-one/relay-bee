import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {MutableRefObject, useEffect} from "react";

export type Serializer = {
    html: () => string,
    json: () => string,
}

type Props = {
    serializerRef: MutableRefObject<Serializer | undefined>,
    initialState?: string | null,
}

export const StatePlugin = ({serializerRef, initialState}: Props) => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        if (initialState) {
            queueMicrotask(() =>
                editor.setEditorState(editor.parseEditorState(initialState)))
        }
    }, [initialState])
    serializerRef.current = {
        html: () => editor.read(() => $generateHtmlFromNodes(editor)),
        json: () => JSON.stringify(editor.getEditorState().toJSON()),
    }
    return <></>
}