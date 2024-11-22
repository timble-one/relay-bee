import {graphql} from "relay-runtime";
import {useMutation} from "react-relay";
import React, {ChangeEvent} from "react";
import {MediaUploaderMutation} from "./__generated__/MediaUploaderMutation.graphql.ts";
import UploadIcon from "../../icon/UploadIcon.tsx";

const mediaObjectUploadMutation = graphql`
    mutation MediaUploaderMutation(
        $connections: [ID!]!
        $file: Upload!
    ) {
        uploadMediaObject(input: {file: $file}) {
            mediaObject @prependNode(connections: $connections, edgeTypeName: "MediaObjectEdge") {
                id
                contentUrl
}}}`;

type Props = {
    mediaObjectsConnection: string
};

export default function MediaUploader({mediaObjectsConnection}: Props) {
    const [commitImage] = useMutation<MediaUploaderMutation>(mediaObjectUploadMutation);

    const uploadFile = (file: File) => {
        commitImage({
            variables: {connections: [mediaObjectsConnection], file: [file]}, uploadables: {file},
        });
    }

    const selectHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            uploadFile(files[0]);
        }
    };

    const dropHandler = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer?.items) {
            const file = e.dataTransfer.items[0].getAsFile();
            file && uploadFile(file);
        } else {
            const file = e.dataTransfer?.items[0].getAsFile();
            file && uploadFile(file);
        }
    }

    return (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
               htmlFor="dropzone-file" onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klicke zum Hochladen</span> oder ziehe das Bild hier rein
                </p>
                <p className="text-xs text-gray-500">max. 8MB grosse Bilder</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={selectHandler}/>
        </label>
    )
}