import {MediaObject} from "../insertion-dialog/MediaInsertionDialog.tsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {CircularButton} from "../../../button/CircularButton.ts";
import clsx from "clsx";
import {DragIcon} from "../../../../icon/DragIcon.tsx";
import {useImagePath} from "../../../../../util/usePath.ts";
import {Link} from "../../../../Link.tsx";

type Props = {
    mediaObject: MediaObject
    onRemove: () => void
}

export function SortableMedia({mediaObject, onRemove}: Props) {
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
                    <Link to={imagePath(contentUrl)} target="_blank">
                        <img
                            src={imagePath(contentUrl, 200)} alt=""
                            className="w-48 m-4 aspect-[3/2] rounded-2xl object-cover"
                        />
                    </Link>
              </div>
            }
        </div>
    )
}
