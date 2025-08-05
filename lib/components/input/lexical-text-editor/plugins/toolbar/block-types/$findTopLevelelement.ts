import {$isRootOrShadowRoot, LexicalNode} from "lexical";
import {$findMatchingParent} from '@lexical/utils';

export const $findTopLevelElement = (node: LexicalNode) => {
    let topLevelElement =
        node.getKey() === 'root'
            ? node
            : $findMatchingParent(node, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
            });

    if (topLevelElement === null) {
        topLevelElement = node.getTopLevelElementOrThrow();
    }
    return topLevelElement;
};
