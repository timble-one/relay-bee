import {
    $isAutoLinkNode,
    $isLinkNode,
} from '@lexical/link';
import {
    $getSelection,
    $isLineBreakNode, $isNodeSelection, $isRangeSelection,
    CLICK_COMMAND, COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_LOW,
    LexicalEditor,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import {Dispatch, type JSX, useEffect, useState} from "react";
import {getSelectedNode} from "../../../utils/getSelectedNode.ts";
import {$findMatchingParent, mergeRegister} from '@lexical/utils';
import {LinkManager} from "./link-manager/LinkManager.tsx";

export const useLinkEditorToolbar = (
    editor: LexicalEditor,
    isLinkEditMode: boolean,
    setIsLinkEditMode: Dispatch<boolean>,
    onChangeVisibility: Dispatch<boolean>,
): JSX.Element | null => {
    const [activeEditor, setActiveEditor] = useState(editor);
    const [isLink, setIsLink] = useState(false);

    useEffect(() => {
        onChangeVisibility(isLink)
    }, [isLink]);

    useEffect(() => {
        function $updateToolbar() {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const focusNode = getSelectedNode(selection);
                const focusLinkNode = $findMatchingParent(focusNode, $isLinkNode);
                const focusAutoLinkNode = $findMatchingParent(
                    focusNode,
                    $isAutoLinkNode,
                );
                if (!(focusLinkNode || focusAutoLinkNode)) {
                    setIsLink(false);
                    return;
                }
                const badNode = selection
                    .getNodes()
                    .filter((node) => !$isLineBreakNode(node))
                    .find((node) => {
                        const linkNode = $findMatchingParent(node, $isLinkNode);
                        const autoLinkNode = $findMatchingParent(node, $isAutoLinkNode);
                        return (
                            (focusLinkNode && !focusLinkNode.is(linkNode)) ||
                            (linkNode && !linkNode.is(focusLinkNode)) ||
                            (focusAutoLinkNode && !focusAutoLinkNode.is(autoLinkNode)) ||
                            (autoLinkNode &&
                                (!autoLinkNode.is(focusAutoLinkNode) ||
                                    autoLinkNode.getIsUnlinked()))
                        );
                    });
                if (!badNode) {
                    setIsLink(true);
                } else {
                    setIsLink(false);
                }
            } else if ($isNodeSelection(selection)) {
                const nodes = selection.getNodes();
                if (nodes.length === 0) {
                    setIsLink(false);
                    return;
                }
                const node = nodes[0];
                const parent = node.getParent();
                if ($isLinkNode(parent) || $isLinkNode(node)) {
                    setIsLink(true);
                } else {
                    setIsLink(false);
                }
            }
        }
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    $updateToolbar();
                    setActiveEditor(newEditor);
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL,
            ),
            editor.registerCommand(
                CLICK_COMMAND,
                (payload) => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const node = getSelectedNode(selection);
                        const linkNode = $findMatchingParent(node, $isLinkNode);
                        if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey)) {
                            window.open(linkNode.getURL(), '_blank');
                            return true;
                        }
                    }
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor]);

    return (
        <LinkManager
            editor={activeEditor}
            isLink={isLink}
            setIsLink={setIsLink}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
        />
    )
}
