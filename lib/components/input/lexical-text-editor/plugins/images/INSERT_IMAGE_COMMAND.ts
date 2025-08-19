import {createCommand, LexicalCommand} from "lexical";
import {InsertImagePayload} from "./ImagesPlugin.tsx";

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
    createCommand('INSERT_IMAGE_COMMAND');