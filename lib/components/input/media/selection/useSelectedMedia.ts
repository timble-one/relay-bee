import {useState} from "react";
import {useFragment} from "react-relay";
import {mediaSelectionObjectFragment} from "./MediaSelection.tsx";
import {MediaSelection_mediaObject$key} from "./__generated__/MediaSelection_mediaObject.graphql.ts";

export const useSelectedMedia = (reducer: (ref: MediaSelection_mediaObject$key) => void) => {
    const [dataRef, setDataRef] = useState<MediaSelection_mediaObject$key>();
    const selectedMedia = useFragment(mediaSelectionObjectFragment, dataRef);

    const selectMedia = (ref: MediaSelection_mediaObject$key) => {
        reducer(ref);
        setDataRef(ref);
    };

    return {selectedMedia, selectMedia};
}