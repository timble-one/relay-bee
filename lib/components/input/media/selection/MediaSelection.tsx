import {useContext, useEffect, useState} from "react";
import {graphql} from "relay-runtime";
import {useFragment, useLazyLoadQuery, usePaginationFragment} from "react-relay";
import MediaUploader from "../MediaUploader.tsx";
import Dialog from "../../../Dialog.tsx";
import {backendPath, nameToId} from "../../../../util/util.ts";
import Spinner from "../../../icon/Spinner.tsx";
import {EndlessScrollContainer} from "../../../util/endless-scroll/EndlessScrollContainer.tsx";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import {EscapeContext} from "../../../util/escape/EscapeContext.ts";
import {MediaSelection_mediaObject$key} from "./__generated__/MediaSelection_mediaObject.graphql.ts";
import {MediaSelection_mediaObjects$key} from "./__generated__/MediaSelection_mediaObjects.graphql.ts";
import {MediaSelectionQuery} from "./__generated__/MediaSelectionQuery.graphql.ts";
import {MediaSelection_mediaObjectEdge$key} from "./__generated__/MediaSelection_mediaObjectEdge.graphql.ts";
import TooltipIcon from "../../../icon/TooltipIcon.tsx";

// I never had problems with this :)
// eslint-disable-next-line react-refresh/only-export-components
export const mediaSelectionObjectFragment = graphql `fragment MediaSelection_mediaObject on MediaObject {
    # id can be useful for parent components
    # eslint-disable-next-line relay/unused-fields
    id contentUrl
}`

type Props = {
    title: string,
    value: MediaSelection_mediaObject$key | undefined | null,
    onSelect: (mediaObject: MediaSelection_mediaObject$key) => void
    description?: string
    required?: boolean
}

export function MediaSelection({title, value: mediaData, onSelect, description, required = false}: Props) {
    const [open, setOpen] = useState(false);
    const mediaObject = useFragment(mediaSelectionObjectFragment, mediaData);
    const inputId = nameToId(title);
    const {addAlert} = useAlerts();
    const {setSubmitListener} = useForm();
    const {setBackOnEscape} = useContext(EscapeContext);

    useEffect(() => {
        const submitHandler = () => {
            if (required && !mediaObject) {
                addAlert(`"${title}" ist ein Pflichtfeld`, 'WARNING');
                return false;
            }
            return true;
        };
        setSubmitListener(() => submitHandler);
    }, [required, mediaObject]);

    useEffect(() => {
        setBackOnEscape && setBackOnEscape(!open);
    }, [open]);

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
                    {mediaObject?.contentUrl &&
                      <div className="flex flex-col justify-center">
                        <img
                          src={backendPath(mediaObject.contentUrl)} alt="image of act"
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
                <MediaSelectionDialog onSelect={onSelect} onClose={() => setOpen(false)}/>
            </Dialog>
        </>
    );
}

type MediaSelectionProps = {
    onSelect: (mediaObject: MediaSelection_mediaObject$key) => void,
    onClose: () => void
}

function MediaSelectionDialog({onSelect, onClose}: MediaSelectionProps) {
    const selectHandler = (mediaObject: MediaSelection_mediaObject$key) => {
        onSelect(mediaObject);
        onClose();
    }
    const mediaObjectsRef: MediaSelection_mediaObjects$key = useLazyLoadQuery<MediaSelectionQuery>(
      graphql `query MediaSelectionQuery {...MediaSelection_mediaObjects}`, {}
    );
    const {data: {mediaObjects}, loadNext, hasNext, isLoadingNext}
    = usePaginationFragment(graphql`
        fragment MediaSelection_mediaObjects on Query
        @argumentDefinitions(
            count: {type: "Int", defaultValue: 12}
            cursor: {type: "String", defaultValue: null}
        )
        @refetchable(queryName: "MediaSelectionPaginationQuery") {
            mediaObjects(order: [{id: "DESC"}], first: $count, after: $cursor)
            @connection(key: "MediaSelection_mediaObjects") {
                __id
                edges {...MediaSelection_mediaObjectEdge}
            }
        }`,
        mediaObjectsRef,
    );
    return (
        <EndlessScrollContainer className="overflow-y-scroll flex flex-col gap-4 pr-2 max-h-96">
            {mediaObjects && <MediaUploader mediaObjectsConnection={mediaObjects?.__id}/>}
            {mediaObjects?.edges &&
                <ul role="list"
                    className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-4"
                >
                    {mediaObjects.edges.map((mediaEdge, i) => mediaEdge &&
                    <PotentialMediaObject mediaEdgeFragment={mediaEdge} onSelect={selectHandler} key={i}/>)}
                </ul>
            }
            <ScrollVisibilityTrigger trigger={() => loadNext(24)} isActive={!isLoadingNext && hasNext}/>
            {isLoadingNext && <div className="w-8 m-auto"><Spinner/></div>}
        </EndlessScrollContainer>
    )
}

type PotentialMediaObjectProps = {
    mediaEdgeFragment: MediaSelection_mediaObjectEdge$key,
    onSelect: (mediaEdge: MediaSelection_mediaObject$key) => void
}

function PotentialMediaObject({mediaEdgeFragment, onSelect}: PotentialMediaObjectProps) {
    const mediaEdge = useFragment(
        graphql`fragment MediaSelection_mediaObjectEdge on MediaObjectEdge {
            node { contentUrl ...MediaSelection_mediaObject }
        }`, mediaEdgeFragment
    );
    const contentUrl = mediaEdge.node?.contentUrl;
    return (
        <li className="relative">
            <div
                className="group w-24 min-h-16 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                onClick={() => mediaEdge.node && onSelect(mediaEdge.node)}
            >
                <img alt="potential image"
                     className="pointer-events-none object-cover group-hover:opacity-75"
                     src={(contentUrl && backendPath(contentUrl)) ?? undefined}/>
            </div>
        </li>
    );
}
