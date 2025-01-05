import {useEffect, useState} from "react";
import {UploadMutation} from "../MediaUploader.tsx";
import Dialog from "../../../dialog/Dialog.tsx";
import {nameToId, useBackendPath} from "../../../../util/util.ts";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import TooltipIcon from "../../../icon/TooltipIcon.tsx";
import {TypedGQL} from "../../../../util/typeGQL.ts";
import {MediaInsertionDialog} from "./MediaInsertionDialog.tsx";
import {useFragment} from "react-relay";
import GenericSingleMediaSelection_mediaObjectGraphql
    from "./__generated__/GenericSingleMediaSelection_mediaObject.graphql.ts";
import {
    RBeeSingleMediaSelectionFragment_mediaObject$key
} from "./__generated__/RBeeSingleMediaSelectionFragment_mediaObject.graphql.ts";

type Props<UPLOAD_MUTATION> = {
    title: string,
    value: RBeeSingleMediaSelectionFragment_mediaObject$key | undefined | null,
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onSelect: (mediaObject: {id: string, contentUrl: string | undefined | null}) => void
    description?: string
    required?: boolean
}

export function SingleMediaSelection<UPLOAD_MUTATION extends UploadMutation>(
    {title, value: data, uploadMutation, onSelect, description, required = false}
    : Props<UPLOAD_MUTATION>
) {
    const [open, setOpen] = useState(false)
    const inputId = nameToId(title)
    const {addAlert} = useAlerts()
    const {setSubmitListener} = useForm()
    const backendPath = useBackendPath()

    const value = useFragment(GenericSingleMediaSelection_mediaObjectGraphql, data)

    useEffect(() => {
        const submitHandler = () => {
            if (required && !value) {
                addAlert(`"${title}" ist ein Pflichtfeld`, 'WARNING')
                return false
            }
            return true
        }
        setSubmitListener(() => submitHandler)
    }, [required, title, value])

    return (
        <>
            <div className="col-span-full row-span-2 2xl:col-span-3">
                <div className="flex flex-row gap-2">
                    <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                        {title}
                    </label>
                    {description &&
                        <TooltipIcon>{description}</TooltipIcon>
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
                <MediaInsertionDialog
                    uploadMutation={uploadMutation}
                    onSelect={onSelect}
                    onClose={() => setOpen(false)}
                />
            </Dialog>
        </>
    )
}
