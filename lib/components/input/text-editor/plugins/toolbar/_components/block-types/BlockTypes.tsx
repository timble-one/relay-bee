import {$getNearestNodeOfType, mergeRegister} from '@lexical/utils';
import {$insertList, $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode} from '@lexical/list';
import {useCallback, useEffect, useState} from 'react';
import {
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    LexicalNode,
    COMMAND_PRIORITY_LOW,
    SELECTION_CHANGE_COMMAND
} from 'lexical';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$isHeadingNode} from '@lexical/rich-text';
import {formatBulletList, formatHeading, formatNumberedList, formatParagraph} from "./utils.ts";
import {clsx} from "clsx";
import {$findTopLevelElement} from "./$findTopLevelelement.ts";

export const BlockTypes = () => {
    const [editor] = useLexicalComposerContext();
    const [blockType, setBlockType] = useState<string>('paragraph')

    const $handleHeadingNode = (selectedElement: LexicalNode) => {
        setBlockType($isHeadingNode(selectedElement)
            ? selectedElement.getTag()
            : selectedElement.getType())
    }

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {

            const anchorNode = selection.anchor.getNode()
            const element = $findTopLevelElement(anchorNode)
            const elementDOM = editor.getElementByKey(element.getKey())

            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
                    const type = parentList ? parentList.getListType() : element.getListType()
                    setBlockType(type)
                } else {
                    $handleHeadingNode(element)
                }
            }
        }
        if ($isNodeSelection(selection)) {
            const nodes = selection.getNodes()
            for (const selectedNode of nodes) {
                const parentList = $getNearestNodeOfType<ListNode>(selectedNode, ListNode,)
                if (parentList) {
                    setBlockType(parentList.getListType())
                } else {
                    $handleHeadingNode($findTopLevelElement(selectedNode))
                }
            }
        }
    }, [
        editor,
        $handleHeadingNode,
    ])

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
            editor.registerCommand(
                INSERT_UNORDERED_LIST_COMMAND,
                () => {
                    $insertList('bullet');
                    return true;
                },
                COMMAND_PRIORITY_LOW
            ),
            editor.registerCommand(
                INSERT_ORDERED_LIST_COMMAND,
                () => {
                    $insertList('number');
                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        )
    }, [editor, $updateToolbar]);

    const headings = [
        {value: 'h3', name: 'Heading 3'},
        {value: 'h4', name: 'Heading 4'},
        {value: 'h5', name: 'Heading 5'},
    ] as const

    return (
        <select
            id="location"
            name="location"
            value={blockType}
            onChange={e => {
                const value = e.currentTarget.value
                if (value === 'paragraph') {
                    formatParagraph(editor)
                } else if (headings.find(h => h.value === value)) {
                    formatHeading(
                        editor,
                        blockType,
                        value as (typeof headings)[number]['value'])
                } else if (value === 'bullet') {
                    formatBulletList(editor, blockType)
                } else if (value === 'number') {
                    formatNumberedList(editor, blockType)
                }
            }}
            className={clsx(
                'block rounded-md border-0 py-1.5',
                'shadow-sm ring-1 ring-inset ring-gray-300',
                'text-gray-900 sm:text-sm/6',
                'focus:ring-2 focus:ring-inset focus:ring-indigo-600'
            )}
        >
            <option value="paragraph">Normal</option>
            {headings.map((h, i) => <option value={h.value} key={i}>{h.name}</option>)}
            <option value="number">Numbered List</option>
            <option value="bullet">Bullet List</option>
        </select>
    )
}
