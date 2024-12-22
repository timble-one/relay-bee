import {useEffect, useState} from "react";
import {OperationType} from "relay-runtime";
import {UploadMutation} from "../MediaUploader.tsx";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import {TypedGQL} from "../../../../util/typeGQL.ts";
import {MediaObject, MediaSelection_RefetchableFragment, MediaSelectionDialog} from "./MediaSelectionDialog.tsx";
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
import { XMarkIcon } from "@heroicons/react/24/outline";
import Dialog from "../../../dialog/Dialog.tsx";

export type SortedMediaObjectCursorConnection = {
    edges?: ReadonlyArray<{
        readonly node: SortedMediaObject | undefined | null
    } | undefined | null> | undefined | null
}

type SortedMediaObject = {
    readonly id?: string,
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
    {title, value: mediaObjects, description, onChange, query, uploadMutation, refetchFragment, required = false}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    const [selectionDialogOpen, setSelectionDialogOpen] = useState(false)
    const inputId = nameToId(title)
    const {addAlert} = useAlerts()
    const {setSubmitListener} = useForm()
    const sortableMedias = mediaObjects?.edges?.map(e => e?.node?.mediaObject).filter(notEmpty)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        const submitHandler = () => {
            if (required && !mediaObjects) {
                addAlert(`"${title}" ist ein Pflichtfeld`, 'WARNING')
                return false
            }
            return true
        }
        setSubmitListener(() => submitHandler)
    }, [required, title, mediaObjects])

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            const activeMedia = sortableMedias?.find(m => m.id === active.id)
            const oldIndex = activeMedia && sortableMedias?.indexOf(activeMedia)
            const overMedia = sortableMedias?.find(m => m.id === over?.id)
            const newIndex = overMedia && over !== null ? sortableMedias?.indexOf(overMedia) : undefined
            if (oldIndex !== undefined && newIndex !== undefined && sortableMedias) {
                onChange({edges:
                    arrayMove(sortableMedias, oldIndex, newIndex)
                        .map((m, i) => ({node: {mediaObject: m, sortingImportance: sortableMedias.length - i}}))
                })
            }
        }
    };

    const getRemoveHandler = (id: string) => () =>
        onChange({edges: mediaObjects?.edges?.filter(e => e?.node?.mediaObject.id !== id)})
    ;

    const add = (mediaObject: MediaObject) => {
        if (!mediaObjects?.edges?.find(e => e?.node?.mediaObject.id == mediaObject.id)) {
            onChange({
                ...mediaObjects ?? {},
                edges: [...mediaObjects?.edges ?? [],
                    {node: {mediaObject, sortingImportance: 0}}
                ]
            })
        }
    }

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
                                    {sortableMedias.map(m =>
                                        <SortableMedia
                                            key={m.id}
                                            mediaObject={m}
                                            onRemove={getRemoveHandler(m.id)}
                                        />
                                    )}
                                </SortableContext>
                            }
                        </div>
                    </DndContext>
                    <button id={inputId} type="button"
                        onClick={() => setSelectionDialogOpen(true)}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Bild hinzufügen
                    </button>
                </div>
            </div>
            <Dialog open={selectionDialogOpen} title="Bild auswählen" onClose={() => setSelectionDialogOpen(false)}>
                <MediaSelectionDialog
                    query={query}
                    refetchFragment={refetchFragment}
                    uploadMutation={uploadMutation}
                    onSelect={add}
                    onClose={() => setSelectionDialogOpen(false)}
                />
            </Dialog>
        </>
    )
}


type SortableMediaProps = {
    mediaObject: MediaObject
    onRemove: () => void
}

export function SortableMedia({mediaObject, onRemove}: SortableMediaProps) {
    const backendPath = useBackendPath()
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
                    <button {...listeners}
                      type="button"
                      className="absolute -top-2 right-10 rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <svg className="size-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF"
                                d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                            />
                        </svg>
                    </button>
                    <button
                        type="button" onClick={onRemove}
                        className="absolute -top-2 right-2 rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        <XMarkIcon aria-hidden="true" className="size-5"/>
                    </button>
                    <img
                        src={backendPath(contentUrl)} alt=""
                        className="w-48 m-4 aspect-[3/2] rounded-2xl object-cover"
                    />
                </div>
            }
        </div>
    )
}
