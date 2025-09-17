import {
    DOMExportOutput,
    DOMExportOutputMap,
    Klass,
    LexicalEditor,
    LexicalNode,
    ParagraphNode,
    TextNode
} from "lexical";
import {removeStylesExportDOM} from "./removeStylesExportDOM.ts";

export const exportMap: DOMExportOutputMap = new Map<
    Klass<LexicalNode>,
    (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
    [ParagraphNode, removeStylesExportDOM],
    [TextNode, removeStylesExportDOM],
]);