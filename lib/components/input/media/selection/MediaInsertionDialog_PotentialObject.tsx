import {useBackendPath} from "../../../../util/util.ts";
import {useFragment} from "react-relay";
import {
    MediaInsertionDialogPotentialObject_mediaObject$key
} from "./__generated__/MediaInsertionDialogPotentialObject_mediaObject.graphql.ts";
import {graphql} from "relay-runtime";

type Props<T extends MediaInsertionDialogPotentialObject_mediaObject$key> = {
    mediaObject: T,
    onSelect: (mediaObject: T) => void
}

export const MediaInsertionDialog_PotentialObject = <T extends MediaInsertionDialogPotentialObject_mediaObject$key>(
    {mediaObject: data, onSelect}: Props<T>
) => {
    const backendPath = useBackendPath()
    const mediaObject = useFragment(graphql`
        fragment MediaInsertionDialogPotentialObject_mediaObject on MediaObject {
            id contentUrl
        }
    `, data)
    const contentUrl = mediaObject?.contentUrl
    return (
        <li className="relative">
            <div
                className="group w-24 min-h-16 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                onClick={() => onSelect(data)}
            >
                <img alt="potential image"
                     className="pointer-events-none object-cover group-hover:opacity-75"
                     src={(contentUrl && backendPath(contentUrl)) ?? undefined}
                />
            </div>
        </li>
    )
};
