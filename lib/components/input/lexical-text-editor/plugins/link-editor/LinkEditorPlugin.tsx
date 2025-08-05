import type {JSX} from 'react';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {Dispatch} from 'react';
import {useLinkEditorToolbar} from "./use-link-editor-toolbar/useLinkEditorToolbar.tsx";

export function LinkEditorPlugin({
     isLinkEditMode,
     setIsLinkEditMode,
     onChangeVisibility,
}: {
    isLinkEditMode: boolean;
    setIsLinkEditMode: Dispatch<boolean>;
    onChangeVisibility: Dispatch<boolean>,
}): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    return useLinkEditorToolbar(
        editor,
        isLinkEditMode,
        setIsLinkEditMode,
        onChangeVisibility,
    );
}
