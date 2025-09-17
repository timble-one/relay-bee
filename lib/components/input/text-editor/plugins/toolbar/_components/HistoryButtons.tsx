import {Button} from "./Button.tsx";
import {CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_LOW, REDO_COMMAND, UNDO_COMMAND} from "lexical";
import {clsx} from "clsx";
import {ArrowUturnLeftIcon, ArrowUturnRightIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {mergeRegister} from "@lexical/utils";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export const HistoryButtons = ({iconClassName}: {iconClassName: string}) => {
    const [editor] = useLexicalComposerContext()
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload)
                    return false
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload)
                    return false
                },
                COMMAND_PRIORITY_LOW,
            ),
        )
    }, [editor])

    return (
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
    )
}
