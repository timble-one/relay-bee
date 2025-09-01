/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react'

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import {
    $wrapNodeInElement,
    mergeRegister,
} from '@lexical/utils'
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import {useEffect} from 'react'
import {
    $createImageNode,
    ImageNode,
} from './image-node/ImageNode.tsx'
import {INSERT_IMAGE_COMMAND, InsertImagePayload} from "./INSERT_IMAGE_COMMAND.ts"

export function ImagesPlugin({captionsEnabled}: {captionsEnabled?: boolean}): JSX.Element | null {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        if (!editor.hasNodes([ImageNode])) {
            throw new Error('ImagesPlugin: ImageNode not registered on editor')
        }

        return mergeRegister(
            editor.registerCommand<InsertImagePayload>(
                INSERT_IMAGE_COMMAND,
                (payload) => {
                    const imageNode = $createImageNode(payload)
                    $insertNodes([imageNode])
                    if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                        $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
                    }

                    return true
                },
                COMMAND_PRIORITY_EDITOR,
            ),
        )
    }, [captionsEnabled, editor])

    return null
}

const TRANSPARENT_IMAGE =
    'data:image/gifbase64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const img = document.createElement('img')
img.src = TRANSPARENT_IMAGE
