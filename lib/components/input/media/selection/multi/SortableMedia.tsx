import {MediaObject} from "../MediaInsertionDialog.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {CircularButton} from "../../../button/CircularButton.ts";
import clsx from "clsx";
import {DragIcon} from "../../../../icon/DragIcon.tsx";
import {useImagePath} from "../../../../../util/usePath.ts";

type Props = {
    mediaObject: MediaObject
    onRemove: () => void
    loadFullSizedImages?: boolean
}

export function SortableMedia({mediaObject, onRemove, loadFullSizedImages}: Props) {
    const imagePath = useImagePath()
    const contentUrl = mediaObject.contentUrl

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: mediaObject.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {contentUrl &&
                <div className="relative">
                    <button {...listeners} type="button"
                        className={clsx(
                            CircularButton.getTailwindClasses('indigo'),
                            'absolute -top-2 right-10',
                        )}
                    >
                        <DragIcon />
                    </button>
                    <button type="button" onClick={onRemove}
                        className={clsx(
                            CircularButton.getTailwindClasses('red'),
                            'absolute -top-2 right-2',
                        )}
                    >
                        <XMarkIcon aria-hidden="true" className="size-5"/>
                    </button>
                    <img
                        src={imagePath(contentUrl, loadFullSizedImages ? undefined : 200)} alt=""
                        className="w-48 m-4 aspect-[3/2] rounded-2xl object-cover"
                    />
              </div>
            }
        </div>
    )
}
