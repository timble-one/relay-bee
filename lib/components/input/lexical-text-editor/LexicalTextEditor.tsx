import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from "./plugins/toolbar/ToolbarPlugin.tsx";
import {config} from "./config.ts";
import "./style.css";
import {clsx} from "clsx";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {MutableRefObject} from "react";
import { Serializer, StatePlugin } from './plugins/StatePlugin.tsx';

type Props = {
    title: string,
    initialValue?: string | null,
    serializerRef: MutableRefObject<Serializer | undefined>
}

export const LexicalTextEditor = ({title, initialValue, serializerRef}: Props) => {
    return (
        <div className="col-span-full 2xl:col-span-6 flex flex-col gap-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="flex flex-col gap-2">
                <LexicalComposer initialConfig={config}>
                    <StatePlugin serializerRef={serializerRef} initialState={initialValue} />
                    <ToolbarPlugin/>
                    <RichTextPlugin
                        contentEditable={<div><Input/></div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <LinkPlugin />
                </LexicalComposer>
            </div>
        </div>
    )
}

const Input = () => {
    return (
        <ContentEditable
            className={clsx(
                'inserted-html px-3 py-1.5 block w-full min-h-16',
                'rounded-md border-0   shadow-sm',
                'ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600',
                'sm:text-sm sm:leading-6 text-gray-900 placeholder:text-gray-400',
            )}
        />
    )
}
