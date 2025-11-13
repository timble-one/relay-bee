import {useRef} from 'react'
import {BlockTypes} from "./_components/block-types/BlockTypes.tsx"
import {TextFormats} from "./_components/TextFormats.tsx"
import {LinkButton} from "./_components/LinkButton.tsx"
import {ImageSelection} from "./_components/ImageSelection.tsx";
import {HistoryButtons} from "./_components/HistoryButtons.tsx";

export default function ToolbarPlugin({imageSelection}: {imageSelection?: ImageSelection}) {
    const toolbarRef = useRef(null)
    const iconClassName = 'size-5'
    return (
        <div className="flex gap-4" ref={toolbarRef}>
            <HistoryButtons iconClassName={iconClassName} />
            <BlockTypes />
            <TextFormats iconClassName={iconClassName}/>
            <LinkButton iconClassName={iconClassName}/>
            {imageSelection && <ImageSelection iconClassName={iconClassName} imageSelection={imageSelection}/>}
        </div>
    )
}
