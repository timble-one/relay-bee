/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Theme} from "./Theme.ts";
import {exportMap} from "./exportMap/exportMap.ts";
import {ParagraphNode, TextNode} from "lexical";
import {LinkNode} from '@lexical/link';
import {InitialConfigType} from "@lexical/react/LexicalComposer";
import { HeadingNode } from '@lexical/rich-text'
import {ListItemNode, ListNode} from '@lexical/list';
import {ImageNode} from "./image/image-node/ImageNode.tsx";

export const config: InitialConfigType = {
    html: {
        export: exportMap,
    },
    namespace: 'OAD-Admin TextEditor',
    nodes: [ParagraphNode, TextNode, LinkNode, HeadingNode, ListNode, ListItemNode, ImageNode],
    onError(error: Error) {
        throw error;
    },
    theme: Theme
};
