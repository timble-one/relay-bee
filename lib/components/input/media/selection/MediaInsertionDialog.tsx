import {TypedGQL, untypeGQL} from "../../../../util/typeGQL.ts";
import {OperationType} from "relay-runtime";
import MediaUploader, {UploadMutation} from "../MediaUploader.tsx";
import {useLazyLoadQuery, usePaginationFragment} from "react-relay";
import {EndlessScrollContainer} from "../../../util/endless-scroll/EndlessScrollContainer.tsx";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import Spinner from "../../../icon/Spinner.tsx";
import {MediaInsertionDialog_PotentialObject} from "./MediaInsertionDialog_PotentialObject.tsx";
import {KeyType} from "react-relay/relay-hooks/helpers";

export type MediaObject = {
    readonly id: string,
    readonly contentUrl: string | null | undefined
}

type MediaObjectsResult = {
    mediaObjects: {
        __id: string, edges: ReadonlyArray<({
                readonly node: MediaObject | undefined | null
            } | undefined | null
        )> | undefined | null
    } | undefined | null
}

export type MediaSelection_RefetchableFragment = KeyType<MediaObjectsResult>

type Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    query: TypedGQL<QUERY>,
    refetchFragment: TypedGQL<REFETCH_FRAGMENT>,
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onSelect: (mediaObject: MediaObject) => void,
    onClose: () => void
}

export const MediaInsertionDialog = <
    REFETCH_FRAGMENT extends MediaSelection_RefetchableFragment,
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    UPLOAD_MUTATION extends UploadMutation
>(
    {query, refetchFragment, uploadMutation, onSelect, onClose}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) => {
    const selectHandler = (mediaObject: MediaObject) => {
        onSelect(mediaObject)
        onClose()
    }
    const mediaObjectResult = useLazyLoadQuery<QUERY>(untypeGQL(query), {})
    const paginationFragment = usePaginationFragment(untypeGQL(refetchFragment), mediaObjectResult)
    const {data: {mediaObjects} = {}, loadNext, hasNext, isLoadingNext} = paginationFragment
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
                  {mediaObjects.edges.map((mediaEdge, i) => mediaEdge?.node &&
                      <MediaInsertionDialog_PotentialObject
                          mediaObject={mediaEdge.node} onSelect={selectHandler} key={i}
                      />
                  )}
              </ul>
            }
            <ScrollVisibilityTrigger trigger={() => loadNext(24)} isActive={!isLoadingNext && hasNext}/>
            {isLoadingNext && <div className="w-8 m-auto"><Spinner/></div>}
        </EndlessScrollContainer>
    )
};
