import {useEffect, useState} from "react";
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
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

export type SortedMediaObjectCursorConnection = {
    edges: ReadonlyArray<{
        readonly node: {
            readonly id: string,
            readonly sortingImportance: number
            readonly mediaObject: MediaObject
        } | undefined | null
    } | undefined | null> | undefined | null
}

type Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    title: string,
    value: SortedMediaObjectCursorConnection | undefined | null,
    query: TypedGQL<QUERY>,
    refetchFragment: TypedGQL<REFETCH_FRAGMENT>,
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onSelect: (mediaObjects: SortedMediaObjectCursorConnection) => void
    description?: string
    required?: boolean
}

export function MultiMediaSelection<
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    REFETCH_FRAGMENT extends MediaSelection_RefetchableFragment,
    UPLOAD_MUTATION extends UploadMutation
>(
    {title, value, required = false}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    //const [selectionDialogOpen, setSelectionDialogOpen] = useState(false)
    //const inputId = nameToId(title)
    const {addAlert} = useAlerts()
    const {setSubmitListener} = useForm()
    //const backendPath = useBackendPath()
    const [items, setItems] = useState<(string | number)[]>([1, 2, 3])
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
            setItems((items) => {
                const oldIndex = items.indexOf(active.id)
                const newIndex = over !== null ? items.indexOf(over.id) : undefined
                return newIndex ? arrayMove(items, oldIndex, newIndex) : items
            })
        }
    };

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(id => <SortableItem key={id} id={id} />)}
                </SortableContext>
            </DndContext>
            {/*<div className="sm:col-span-4 max-w-md flex flex-col gap-2">
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
                <div className="flex flex-col gap-2 items-start"
                     onClick={() => setSelectionDialogOpen(true)}
                >
                    {value?.contentUrl &&
                      <div className="flex flex-col justify-center">
                        <img
                          src={backendPath(value.contentUrl)} alt="image of act"
                          className="max-h-32 max-w-32"
                        />
                      </div>
                    }
                    <button id={inputId} type="button"
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Bild auswählen
                    </button>
                </div>
            </div>
            <Dialog open={selectionDialogOpen} title="Bild auswählen" onClose={() => setSelectionDialogSelectionDialogOpen(false)}>
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



export function SortableItem({id}: {id: string | number}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h2>Sortable Item</h2>
        </div>
    );
}
