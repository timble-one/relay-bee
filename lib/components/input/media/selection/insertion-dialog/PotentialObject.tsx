import {MediaObject} from "./MediaInsertionDialog.tsx";
import {useImagePath} from "../../../../util/usePath.ts";

type Props = {
    mediaObject: MediaObject,
    onSelect: (mediaObject: MediaObject) => void
    loadFullSizedImages?: boolean
}

export const PotentialObject = ({mediaObject, onSelect, loadFullSizedImages}: Props) => {
    const contentUrl = mediaObject?.contentUrl
    const imagePath = useImagePath()
    return (
        <li className="relative">
            <div
                className="group w-24 min-h-16 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                onClick={() => onSelect(mediaObject)}
            >
                <img alt="potential image"
                     className="pointer-events-none object-cover group-hover:opacity-75"
                     src={(contentUrl && imagePath(contentUrl, loadFullSizedImages ? undefined : 100)) ?? undefined}
                />
            </div>
        </li>
    )
};
