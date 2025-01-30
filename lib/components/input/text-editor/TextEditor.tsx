import "quill/dist/quill.snow.css";
import {useEffect, useLayoutEffect, useRef} from 'react';
import Quill from 'quill/core';
import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";
import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";
import Link from "quill/formats/link";
import List from "quill/formats/list";
import Underline from "quill/formats/underline";
import {toolbarOptions} from "./Toolbar.ts";
import {nameToId} from "../../../util/util.ts";
import "./text-editor.css";

Quill.register({
    'modules/toolbar': Toolbar,
    'themes/snow': Snow,
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/header': Header,
    'formats/link': Link,
    'formats/underline': Underline,
    'formats/list': List
})

type Props = {
    title: string,
    readOnly?: boolean,
    defaultValue?: string,
    onChange?: (value: string) => void
}

export const TextEditor = ({title, readOnly, defaultValue, onChange}: Props) => {
    const inputId = nameToId(title);
    const ref = useRef<Quill>()
    const containerRef = useRef<HTMLDivElement>(null)
    const defaultValueRef = useRef(defaultValue)
    const onTextChangeRef = useRef(onChange)

    useLayoutEffect(() => {
        onTextChangeRef.current = onChange
    })

    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            ref.current?.enable(!readOnly)
        }
    }, [ref, readOnly])

    useEffect(() => {
        if (ref && typeof ref !== 'function') {
            const container = containerRef.current;
            const editorContainer = container?.appendChild(
                container.ownerDocument.createElement('div'),
            );

            const quill = editorContainer && new Quill(editorContainer, {
                theme: 'snow', modules: {toolbar: toolbarOptions}
            })

            ref.current = quill

            if (defaultValueRef.current) {
                quill?.setContents(JSON.parse(defaultValueRef.current))
            }

            quill?.on(Quill.events.TEXT_CHANGE, () => {
                onTextChangeRef.current?.(JSON.stringify(ref.current?.getContents()))
            })

            return () => {
                ref.current = undefined;
                if (container?.innerHTML) container.innerHTML = ''
            }
        }
    }, [ref])

    return (
        <div className="col-span-full 2xl:col-span-3">
            <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div id={inputId} className="relative mt-2 rounded-md shadow-sm">
                <div className="inserted-html" ref={containerRef}></div>
            </div>
        </div>
    )
}
