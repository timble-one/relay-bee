/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_LOW,
    REDO_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import {useEffect, useRef, useState} from 'react';
import {
    ArrowUturnLeftIcon, ArrowUturnRightIcon, PhotoIcon
} from "@heroicons/react/20/solid";
import { Button } from './Button.tsx';
import {clsx} from "clsx";
import {BlockTypes} from "./block-types/BlockTypes.tsx";
import {TextFormats} from "./TextFormats.tsx";
import {INSERT_IMAGE_COMMAND} from "../images/INSERT_IMAGE_COMMAND.ts";
import {LinkButton} from "./LinkButton.tsx";

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor]);

    const iconClassName = 'size-5'

    return (
        <div className="flex gap-4" ref={toolbarRef}>
            <div className="flex gap-2">
                <Button
                    disabled={!canUndo}
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                    aria-label="Undo"
                    className={clsx(canUndo || 'text-gray-500')}
                >
                    <ArrowUturnLeftIcon className={iconClassName} />
                </Button>
                <Button
                    disabled={!canRedo}
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                    aria-label="Redo"
                    className={clsx(canRedo || 'text-gray-500')}
                >
                    <ArrowUturnRightIcon className={iconClassName} />
                </Button>
            </div>
            <BlockTypes />
            <TextFormats iconClassName={iconClassName}/>
            <LinkButton iconClassName={iconClassName}/>
            <Button
                onClick={() => editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    src: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
                    altText: 'image'
                })}
                aria-label="Insert IMage"
            >
                <PhotoIcon className={iconClassName} />
            </Button>
        </div>
    );
}
