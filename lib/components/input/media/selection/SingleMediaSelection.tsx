import {useEffect, useState} from "react";
import {OperationType} from "relay-runtime";
import {UploadMutation} from "../MediaUploader.tsx";
import {Dialog} from "../../../dialog/Dialog.tsx";
import {nameToId} from "../../../../util/util.ts";
import {useAlerts} from "../../../alert/useAlerts.ts";
import {useForm} from "../../form/useForm.ts";
import {TypedGQL} from "../../../../util/typeGQL.ts";
import {
    MediaObject, MediaSelection_RefetchableFragment, MediaInsertionDialog
} from "./insertion-dialog/MediaInsertionDialog.tsx";
import {useImagePath} from "../../../../util/usePath.ts";
import {Link} from "../../../Link.tsx";
import {InputLabel} from "../../InputLabel.tsx";

type Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION> = {
    title: string,
    value: MediaObject | undefined | null,
    query: TypedGQL<QUERY>,
    refetchFragment: TypedGQL<REFETCH_FRAGMENT>,
    uploadMutation: TypedGQL<UPLOAD_MUTATION>,
    onSelect: (mediaObject: MediaObject) => void
    description?: string
    required?: boolean
}

export function SingleMediaSelection<
    QUERY extends OperationType & {response: REFETCH_FRAGMENT},
    REFETCH_FRAGMENT extends MediaSelection_RefetchableFragment,
    UPLOAD_MUTATION extends UploadMutation
>(
    {title, value, query, refetchFragment, uploadMutation, onSelect, description, required = false}
    : Props<QUERY, REFETCH_FRAGMENT, UPLOAD_MUTATION>
) {
    const [open, setOpen] = useState(false)
    const inputId = nameToId(title)
    const {addAlert} = useAlerts()
    const {setSubmitListener} = useForm()
    const imagePath = useImagePath()

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
            <div className="col-span-6 2xl:col-span-3 row-span-4">
                <InputLabel inputId={inputId} description={description}>{title}</InputLabel>
                <div className="flex flex-col gap-2 items-start"
                     onClick={() => setOpen(true)}
                >
                    {value?.contentUrl &&
                        <div className="flex flex-col justify-center">
                            <Link to={imagePath(value.contentUrl)} target="_blank">
                                <img
                                  src={imagePath(value.contentUrl, 200)} alt="image of act"
                                  className="max-h-32 max-w-32"
                                />
                            </Link>
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
                    query={query}
                    refetchFragment={refetchFragment}
                    uploadMutation={uploadMutation}
                    onSelect={onSelect}
                    onClose={() => setOpen(false)}
                />
            </Dialog>
        </>
    )
}
