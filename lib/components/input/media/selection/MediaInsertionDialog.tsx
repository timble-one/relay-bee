import {TypedGQL} from "../../../../util/typeGQL.ts";
import MediaUploader, {UploadMutation} from "../MediaUploader.tsx";
import {useLazyLoadQuery, usePaginationFragment} from "react-relay";
import {EndlessScrollContainer} from "../../../util/endless-scroll/EndlessScrollContainer.tsx";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import Spinner from "../../../icon/Spinner.tsx";
import {MediaInsertionDialog_PotentialObject} from "./MediaInsertionDialog_PotentialObject.tsx";
import {ExtractNodeFromEdges} from "../../../../util/util.ts";
import {
    MediaInsertionDialogQuery,
} from "./__generated__/MediaInsertionDialogQuery.graphql.ts";
import {
    MediaInsertionDialog_mediaObjects$data,
    MediaInsertionDialog_mediaObjects$key
} from "./__generated__/MediaInsertionDialog_mediaObjects.graphql.ts";
import {graphql} from "relay-runtime";

export type MediaObject = {
    readonly id: string,
    readonly contentUrl: string | null | undefined
}

type Props<
    UPLOAD_MUTATION
> = {
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onSelect: (mediaObject: ExtractNodeFromEdges<MediaInsertionDialog_mediaObjects$data['mediaObjects']>) => void,
    onClose: () => void
}

export const MediaInsertionDialog = <
    UPLOAD_MUTATION extends UploadMutation
>(
    {uploadMutation, onSelect, onClose}
    : Props<UPLOAD_MUTATION>
) => {
    const selectHandler = (
        mediaObject: ExtractNodeFromEdges<MediaInsertionDialog_mediaObjects$data['mediaObjects']>
    ) => {
        onSelect(mediaObject)
        onClose()
    }
    const mediaObjectResult: MediaInsertionDialog_mediaObjects$key = useLazyLoadQuery<MediaInsertionDialogQuery>(
        graphql`query MediaInsertionDialogQuery {...MediaInsertionDialog_mediaObjects}`, {}
    )
    const paginationFragment = usePaginationFragment(graphql`
        fragment MediaInsertionDialog_mediaObjects on Query
        @argumentDefinitions(
            count: {type: "Int", defaultValue: 12}
            cursor: {type: "String", defaultValue: null}
        )
        @refetchable(queryName: "MediaSelectionPaginationQuery")
        {
            mediaObjects(order: [{id: "DESC"}], first: $count, after: $cursor)
            @connection(key: "MediaSelection_mediaObjects")
            {
                __id edges {node {
                    id contentUrl ...MediaInsertionDialogPotentialObject_mediaObject
                }}
            }
        }
    `, mediaObjectResult)
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
