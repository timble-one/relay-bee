import {createCommand, LexicalCommand} from "lexical";
import {ImagePayload} from "./image-node/ImageNode.tsx";

export type InsertImagePayload = Readonly<ImagePayload>

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
    createCommand('INSERT_IMAGE_COMMAND');
