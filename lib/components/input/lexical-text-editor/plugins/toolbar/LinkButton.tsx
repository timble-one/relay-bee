import {Button} from "./Button.tsx";
import {clsx} from "clsx";
import {LinkIcon} from "@heroicons/react/20/solid";
import {LinkEditorPlugin} from "../link-editor/LinkEditorPlugin.tsx";
import {autoUpdate, offset, useFloating, arrow, FloatingArrow} from "@floating-ui/react";
import {useRef, useState} from "react";

type Props = {
    onClick: () => void,
    active: boolean,
    iconClassName: string,
    isLinkEditMode: boolean,
    setIsLinkEditMode: (value: boolean) => void,
}

export const LinkButton = ({onClick, active, iconClassName, isLinkEditMode, setIsLinkEditMode}: Props) => {
    const arrowRef = useRef(null)
    const [editorVisible, setEditorVisible] = useState(false)
    const {refs, floatingStyles, context} = useFloating({
        whileElementsMounted: autoUpdate,
        placement: 'top',
        middleware: [
            offset(10),
            arrow({element: arrowRef}),
        ],
    })
    return (
        <>
            <div ref={refs.setReference} className="flex">
                <Button
                    onClick={onClick}
                    className={clsx(active && 'text-blue-700')}
                    aria-label="Insert link"
                >
                    <LinkIcon className={iconClassName} />
                </Button>
            </div>
            <div ref={refs.setFloating} style={floatingStyles}>
                <FloatingArrow ref={arrowRef} context={context} className={clsx(editorVisible || 'hidden')}/>
                <LinkEditorPlugin
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                    onChangeVisibility={v => setEditorVisible(v)}
                />
            </div>
        </>
    )
}
