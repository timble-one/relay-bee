import {createCommand, LexicalCommand} from "lexical";
import {InsertImagePayload} from "./InsertImageDialog.tsx";

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
    createCommand('INSERT_IMAGE_COMMAND');