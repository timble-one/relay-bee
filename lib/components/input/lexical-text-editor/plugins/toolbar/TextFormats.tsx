import {useCallback, useEffect, useState} from "react";
import {
    $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {mergeRegister} from '@lexical/utils';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {
    Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon,
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "@heroicons/react/20/solid";
import {LinkButton} from "./LinkButton.tsx";
import {getSelectedNode} from "../../utils/getSelectedNode.ts";
import {sanitizeUrl} from "../../utils/url.ts";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {Button} from "./Button.tsx";
import {clsx} from "clsx";

export const TextFormats = ({iconClassName}: {iconClassName: string}) => {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
    const [isLink, setIsLink] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            const isLink = $isLinkNode(parent) || $isLinkNode(node);
            setIsLink(isLink);

            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
    }, []);

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
        <div className="flex gap-2">
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                aria-label="Format Bold"
                className={clsx(isBold && 'text-blue-700')}
            >
                <BoldIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                aria-label="Format Italics"
                className={clsx(isItalic && 'text-blue-700')}
            >
                <ItalicIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                aria-label="Format Underline"
                className={clsx(isUnderline && 'text-blue-700')}
            >
                <UnderlineIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                aria-label="Format Strikethrough"
                className={clsx(isStrikethrough && 'text-blue-700')}
            >
                <StrikethroughIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
                aria-label="Left Align"
            >
                <Bars3BottomLeftIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                aria-label="Center Align"
            >
                <Bars3Icon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                aria-label="Right Align"
            >
                <Bars3BottomRightIcon className={iconClassName} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
                aria-label="Justify Align"
            >
                <Bars3Icon className={iconClassName} />
            </Button>
            <LinkButton
                active={isLink}
                onClick={insertLink}
                iconClassName={iconClassName}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
            />
        </div>
    )
}
