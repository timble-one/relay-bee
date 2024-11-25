import {useContext, useEffect, useState} from "react";
import {OperationType} from "relay-runtime";
import {useLazyLoadQuery, usePaginationFragment} from "react-relay";
import MediaUploader, {UploadMutation} from "../MediaUploader.tsx";
import Dialog from "../../../Dialog.tsx";
import {backendPath, nameToId} from "../../../../util/util.ts";
import Spinner from "../../../icon/Spinner.tsx";
import {EndlessScrollContainer} from "../../../util/endless-scroll/EndlessScrollContainer.tsx";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import {EscapeContext} from "../../../util/escape/EscapeContext.ts";
import TooltipIcon from "../../../icon/TooltipIcon.tsx";
import {KeyType} from "react-relay/relay-hooks/helpers";
import {TypedGql, untypeGql} from "../../../../util/typeGql";

export type MediaObject = {id: string, contentUrl: string}

type MediaObjectsResult = {mediaObjects: {__id: string, edges: {node: MediaObject}[]}}
type RefetchableFragment = KeyType & {' $data': MediaObjectsResult}

type Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    title: string,
    value: MediaObject | undefined | null,
    query: TypedGql<QUERY>,
    refetchFragment: TypedGql<REFETCH_FRAGMENT>,
    uploadMutation: TypedGql<UPLOAD_MUTATION>,
    onSelect: (mediaObject: MediaObject) => void
    description?: string
    required?: boolean
}

export function MediaSelection<
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    REFETCH_FRAGMENT extends RefetchableFragment,
    UPLOAD_MUTATION extends UploadMutation
>(
    {title, value, query, refetchFragment, uploadMutation, onSelect, description, required = false}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    const [open, setOpen] = useState(false);
    const inputId = nameToId(title);
    const {addAlert} = useAlerts();
    const {setSubmitListener} = useForm();
    const {setBackOnEscape} = useContext(EscapeContext);

    useEffect(() => {
        const submitHandler = () => {
            if (required && !value) {
                addAlert(`"${title}" ist ein Pflichtfeld`, 'WARNING')
                return false
            }
            return true
        }
        setSubmitListener(() => submitHandler)
    }, [addAlert, required, setSubmitListener, title, value])

    useEffect(() => {
        setBackOnEscape?.(!open)
    }, [setBackOnEscape, open])

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
                <div className="flex flex-col gap-2 items-start"
                     onClick={() => setOpen(true)}
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
            <Dialog open={open} title="Bild auswählen" onClose={() => setOpen(false)}>
                <MediaSelectionDialog
                    query={query}
                    refetchFragment={refetchFragment}
                    uploadMutation={uploadMutation}
                    onSelect={onSelect}
                    onClose={() => setOpen(false)}
                />
            </Dialog>
        </>
    );
}

type MediaSelectionProps<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    query: TypedGql<QUERY>,
    refetchFragment: TypedGql<REFETCH_FRAGMENT>,
    uploadMutation: TypedGql<UPLOAD_MUTATION>,
    onSelect: (mediaObject: MediaObject) => void,
    onClose: () => void
}

function MediaSelectionDialog<
    REFETCH_FRAGMENT extends RefetchableFragment,
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    UPLOAD_MUTATION extends UploadMutation
>(
    {query, refetchFragment, uploadMutation, onSelect, onClose}: MediaSelectionProps<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    const selectHandler = (mediaObject: MediaObject) => {
        onSelect(mediaObject)
        onClose()
    }
    const mediaObjectResult = useLazyLoadQuery<QUERY>(untypeGql(query), {})
    const {data: {mediaObjects}, loadNext, hasNext, isLoadingNext}
        = usePaginationFragment(untypeGql(refetchFragment), mediaObjectResult)
    ;
    return (
        <EndlessScrollContainer className="overflow-y-scroll flex flex-col gap-4 pr-2 max-h-96">
            {mediaObjects &&
                <MediaUploader
                  mutation={uploadMutation}
                  mediaObjectsConnection={mediaObjects?.__id}
                />
            }
            {mediaObjects?.edges &&
                <ul role="list"
                    className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-4"
                >
                    {mediaObjects.edges.map((mediaEdge, i) => mediaEdge &&
                    <PotentialMediaObject mediaObject={mediaEdge.node} onSelect={selectHandler} key={i}/>)}
                </ul>
            }
            <ScrollVisibilityTrigger trigger={() => loadNext(24)} isActive={!isLoadingNext && hasNext}/>
            {isLoadingNext && <div className="w-8 m-auto"><Spinner/></div>}
        </EndlessScrollContainer>
    )
}

type PotentialMediaObjectProps = {
    mediaObject: MediaObject,
    onSelect: (mediaObject: MediaObject) => void
}

function PotentialMediaObject({mediaObject, onSelect}: PotentialMediaObjectProps) {
    const contentUrl = mediaObject.contentUrl;
    return (
        <li className="relative">
            <div
                className="group w-24 min-h-16 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                onClick={() => onSelect(mediaObject)}
            >
                <img alt="potential image"
                     className="pointer-events-none object-cover group-hover:opacity-75"
                     src={(contentUrl && backendPath(contentUrl)) ?? undefined}/>
            </div>
        </li>
    );
}
