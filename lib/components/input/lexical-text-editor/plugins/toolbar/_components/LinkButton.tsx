import {Button} from "./Button.tsx";
import {clsx} from "clsx";
import {LinkIcon} from "@heroicons/react/20/solid";
import {LinkEditorPlugin} from "../../link-editor/LinkEditorPlugin.tsx";
import {autoUpdate, offset, useFloating, arrow, FloatingArrow} from "@floating-ui/react";
import {useCallback, useEffect, useRef, useState} from "react";
import {TOGGLE_LINK_COMMAND} from '@lexical/link';
import {sanitizeUrl} from "../../../utils/url.ts";
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND} from "lexical";
import {getSelectedNode} from "../../../utils/getSelectedNode.ts";
import {$isLinkNode} from '@lexical/link';
import {mergeRegister} from "@lexical/utils";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

type Props = {
    iconClassName: string,
}

export const LinkButton = ({iconClassName}: Props) => {
    const [editor] = useLexicalComposerContext();
    const arrowRef = useRef(null)
    const [editorVisible, setEditorVisible] = useState(false)
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
    const [isLink, setIsLink] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
        whileElementsMounted: autoUpdate,
        placement: 'top',
        middleware: [
            offset(10),
            arrow({element: arrowRef}),
        ],
    })

    const insertLink = useCallback(() => {
        if (!isLink) {
            setIsLinkEditMode(true)
            editor.dispatchCommand(
                TOGGLE_LINK_COMMAND,
                sanitizeUrl('https://'),
            );
        } else {
            setIsLinkEditMode(false)
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, setIsLinkEditMode, isLink]);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            const isLink = $isLinkNode(parent) || $isLinkNode(node);
            setIsLink(isLink);
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    $updateToolbar();
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor, $updateToolbar]);

    return (
        <>
            <div ref={refs.setReference} className="flex">
                <Button
                    onClick={insertLink}
                    className={clsx(isLink && 'text-blue-700')}
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
