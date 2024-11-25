import {useState} from "react";
import {MediaObject} from "./MediaSelection";

export const useSelectedMedia = (reducer: (mediaObject: MediaObject | undefined) => void) => {
    const [selectedMedia, setSelectedMedia] = useState<MediaObject>();

    const selectMedia = (selection: MediaObject) => {
        reducer(selectedMedia);
        setSelectedMedia(selection);
    };

    return {selectedMedia, selectMedia};
}