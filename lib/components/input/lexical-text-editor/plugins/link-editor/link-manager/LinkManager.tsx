import {
    $createLinkNode,
    $isAutoLinkNode,
    $isLinkNode,
    TOGGLE_LINK_COMMAND,
} from '@lexical/link';
import {$findMatchingParent, mergeRegister} from '@lexical/utils';
import {
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    BaseSelection, COMMAND_PRIORITY_HIGH, COMMAND_PRIORITY_LOW, KEY_ESCAPE_COMMAND,
    LexicalEditor,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import {Dispatch, type JSX, useCallback, useEffect, useRef, useState} from "react";
import {getSelectedNode} from "../../../utils/getSelectedNode.ts";
import * as React from "react";
import {sanitizeUrl} from "../../../utils/url.ts";
import {LinkEditor} from "./LinkEditor.tsx";
import {LinkPreview} from "./LinkPreview.tsx";
import {clsx} from 'clsx';
import {ifPresent} from 'tssentials';

export const LinkManager = ({
    editor,
    isLink,
    setIsLink,
    isLinkEditMode,
    setIsLinkEditMode,
}: {
    editor: LexicalEditor
    isLink: boolean
    setIsLink: Dispatch<boolean>
    isLinkEditMode: boolean
    setIsLinkEditMode: Dispatch<boolean>
}): JSX.Element => {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [lastSelection, setLastSelection] = useState<BaseSelection | null>(null)
    const [linkUrl, setSetLinkUrl] = useState<string>('')
    const [linkTarget, setLinkTarget] = useState<string | null>(null)
    const [editedLinkUrl, setEditedLinkUrl] = useState<string>('https://')
    const [editedLinkTarget, setEditedLinkTarget] = useState<string | null>(null)

    const $updateLinkEditor = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection)
            const linkParent = $findMatchingParent(node, $isLinkNode)
            if (linkParent) {
                setSetLinkUrl(linkParent.getURL())
                setLinkTarget(linkParent.getTarget())
            } else if ($isLinkNode(node)) {
                setSetLinkUrl(node.getURL)
                setLinkTarget(node.getTarget())
            } else {
                setSetLinkUrl('')
                setLinkTarget(null)
            }
            if (isLinkEditMode) {
                setEditedLinkUrl(linkUrl)
                setEditedLinkTarget(linkTarget)
            }
        } else if ($isNodeSelection(selection)) {
            const nodes = selection.getNodes()
            if (nodes.length > 0) {
                const node = nodes[0]
                const parent = node.getParent()
                if ($isLinkNode(parent)) {
                    setSetLinkUrl(parent.getURL())
                    setLinkTarget(parent.getTarget())
                } else if ($isLinkNode(node)) {
                    setSetLinkUrl(node.getURL())
                    setLinkTarget(node.getTarget())
                } else {
                    setSetLinkUrl('')
                    setLinkTarget(null)
                }
                if (isLinkEditMode) {
                    setEditedLinkUrl(linkUrl)
                    setEditedLinkTarget(linkTarget)
                }
            }
        }

        const editorElem = editorRef.current
        const activeElement = document.activeElement

        if (editorElem === null) {
            return
        }

        const rootElement = editor.getRootElement()

        if (selection !== null && rootElement !== null && editor.isEditable()) {
            setLastSelection(selection)
        } else if (!activeElement || activeElement.className !== 'link-input') {
            setLastSelection(null)
            setIsLinkEditMode(false)
            setSetLinkUrl('')
            setLinkTarget(null)
        }

        return true
    }, [editor, setIsLinkEditMode, isLinkEditMode, linkUrl, linkTarget])

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateLinkEditor()
                })
            }),

            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                () => {
                    $updateLinkEditor()
                    return true
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                KEY_ESCAPE_COMMAND,
                () => {
                    if (isLink) {
                        setIsLink(false)
                        return true
                    }
                    return false
                },
                COMMAND_PRIORITY_HIGH,
            ),
        )
    }, [editor, $updateLinkEditor, setIsLink, isLink])

    useEffect(() => {
        editor.getEditorState().read(() => {
            $updateLinkEditor()
        })
    }, [editor, $updateLinkEditor])

    useEffect(() => {
        if (isLinkEditMode && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isLinkEditMode, isLink])

    const monitorInputInteraction = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleLinkSubmission(event)
        } else if (event.key === 'Escape') {
            event.preventDefault()
            setIsLinkEditMode(false)
        }
    }

    const handleLinkSubmission = (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement>,
    ) => {
        event.preventDefault()
        if (lastSelection !== null) {
            if (linkUrl) {
                editor.update(() => {
                    editor.dispatchCommand(
                        TOGGLE_LINK_COMMAND,
                        {
                            url: ifPresent(editedLinkUrl, url => sanitizeUrl(url)) ?? '',
                            target: editedLinkTarget,
                        },
                    )
                    const selection = $getSelection()
                    if ($isRangeSelection(selection)) {
                        const parent = getSelectedNode(selection).getParent()
                        if ($isAutoLinkNode(parent)) {
                            const linkNode = $createLinkNode(parent.getURL(), {
                                rel: parent.__rel, target: parent.__target, title: parent.__title,
                            })
                            parent.replace(linkNode, true)
                        }
                    }
                })
            }
            setEditedLinkUrl('https://')
            setEditedLinkTarget(null)
            setIsLinkEditMode(false)
        }
    }

    return (
        <div
            ref={editorRef}
            className={clsx(
                isLink || 'hidden',
                'flex h-12 w-[500px] p-2 pl-4 pr-1 gap-2 items-center bg-white',
                'rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 '
            )}
        >
            {!isLink ? null : isLinkEditMode
                ? <LinkEditor
                    value={{url: editedLinkUrl, targetBlank: editedLinkTarget === '_blank'}}
                    inputRef={inputRef}
                    onChange={link => {
                        setEditedLinkUrl(link.url)
                        setEditedLinkTarget(link.targetBlank ? '_blank' : null)
                    }}
                    onKeyDown={monitorInputInteraction}
                    onCancel={() => setIsLinkEditMode(false)}
                    onSubmit={handleLinkSubmission}
                />
                : <LinkPreview
                    value={linkUrl}
                    onClickEdit={(event) => {
                        event.preventDefault()
                        setEditedLinkUrl(linkUrl)
                        setEditedLinkTarget(linkTarget)
                        setIsLinkEditMode(true)
                    }}
                    onClickDelete={() => {
                        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
                    }}
                />
            }
        </div>
    )
}
