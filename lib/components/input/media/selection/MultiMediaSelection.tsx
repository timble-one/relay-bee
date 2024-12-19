import {useEffect} from "react";
import {OperationType} from "relay-runtime";
import {UploadMutation} from "../MediaUploader.tsx";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import {TypedGQL} from "../../../../util/typeGQL.ts";
import {MediaObject, MediaSelection_RefetchableFragment} from "./MediaSelectionDialog.tsx";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import TooltipIcon from "../../../icon/TooltipIcon.tsx";
import {nameToId, notEmpty, useBackendPath} from "../../../../util/util.ts";

export type SortedMediaObjectCursorConnection = {
    edges: ReadonlyArray<{
        readonly node: SortedMediaObject | undefined | null
    } | undefined | null> | undefined | null
}

type SortedMediaObject = {
    readonly id: string,
    readonly sortingImportance: number
    readonly mediaObject: MediaObject
}

type Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    title: string,
    value: SortedMediaObjectCursorConnection | undefined | null,
    query: TypedGQL<QUERY>,
    refetchFragment: TypedGQL<REFETCH_FRAGMENT>,
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onChange: (mediaObjects: SortedMediaObjectCursorConnection) => void
    description?: string
    required?: boolean
}

export function MultiMediaSelection<
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    REFETCH_FRAGMENT extends MediaSelection_RefetchableFragment,
    UPLOAD_MUTATION extends UploadMutation
>(
    {title, value, description, onChange, required = false}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    //const [selectionDialogOpen, setSelectionDialogOpen] = useState(false)
    const inputId = nameToId(title)
    const {addAlert} = useAlerts()
    const {setSubmitListener} = useForm()
    const sortableMedias = value?.edges?.map(e => e?.node).filter(notEmpty)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        const submitHandler = () => {
            if (required && !value) {
                addAlert(`"${title}" ist ein Pflichtfeld`, 'WARNING')
                return false
            }
            return true
        }
        setSubmitListener(() => submitHandler)
    }, [required, title, value])

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            const activeMedia = sortableMedias?.find(m => m.id === active.id)
            const oldIndex = activeMedia && sortableMedias?.indexOf(activeMedia)
            const overMedia = sortableMedias?.find(m => m.id === over?.id)
            const newIndex = overMedia && over !== null ? sortableMedias?.indexOf(overMedia) : undefined
            if (oldIndex !== undefined && newIndex !== undefined && sortableMedias) {
                onChange({edges:
                    arrayMove(sortableMedias, oldIndex, newIndex).map(m => ({node: m}))
                })
            }
        }
    };

    return (
        <>
            <div className="sm:col-span-4 max-w-md flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                        {title}
                    </label>
                    {description &&
                      <TooltipIcon>
                          {description}
                      </TooltipIcon>
                    }
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <div className="flex flex-wrap">
                            {sortableMedias &&
                                <SortableContext items={sortableMedias}>
                                    {sortableMedias.map(o => <SortableMedia key={o.id} sortedMedia={o} />)}
                                </SortableContext>
                            }
                        </div>
                    </DndContext>
                    <button id={inputId} type="button"
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Bild hinzufügen
                    </button>
                </div>
            </div>
            {/*<Dialog open={selectionDialogOpen} title="Bild auswählen" onClose={() => setSelectionDialogSelectionDialogOpen(false)}>
                <MediaSelectionDialog
                    query={query}
                    refetchFragment={refetchFragment}
                    uploadMutation={uploadMutation}
                    onSelect={onSelect}
                    onClose={() => setSelectionDialogOpen(false)}
                />
            </Dialog>*/}
        </>
    )
}



export function SortableMedia({sortedMedia}: {sortedMedia: SortedMediaObject}) {
    const backendPath = useBackendPath()
    const contentUrl = sortedMedia.mediaObject.contentUrl

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: sortedMedia?.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {contentUrl && <img
                src={backendPath(contentUrl)} alt="image"
                className="max-h-32 max-w-32"
            />}
        </div>
    )
}
