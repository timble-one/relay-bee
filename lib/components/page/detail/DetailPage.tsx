import {ReactNode, useState} from "react";
import {EntityDescription} from "../../../EntityDescription.tsx";
import {Form} from "../../input/form/Form.tsx";
import {TrashIcon} from "@heroicons/react/16/solid";
import DeleteConfirmation from "../../dialog/delete/DeleteConfirmation.tsx";
import useDeleter from "../../util/useDeleter.ts";
import Breadcrumbs from "../../Breadcrumbs.tsx";
import {EscapeContext} from "../../util/escape/EscapeContext.ts";
import {useBackOnEscape} from "../../util/escape/useBackOnEscape.ts";
import {TypedGQL, untypeGQL} from "../../../util/typeGQL";
import {MutationParameters} from "relay-runtime";
import {useMutation} from "react-relay";
import {getDefaultListRoute} from "../list/getDefaultListRoute.ts";
import {useRouter} from "../../../util/router/util.ts";
import {Link} from "../../Link.tsx";

type Props<DELETE_MUTATION> = {
    children: ReactNode,
    entityDescription: EntityDescription<unknown>,
    objectName?: string,
    state: {id?: string},
    onSubmit: () => void,
    deleteMutation: TypedGQL<DELETE_MUTATION>
}

export function DetailPage<DELETE_MUTATION extends MutationParameters & {variables: {id: string}}>(
    {children, entityDescription, objectName, state, onSubmit, deleteMutation}: Props<DELETE_MUTATION>
) {
    const [commitDelete] = useMutation<DELETE_MUTATION>(untypeGQL(deleteMutation))
    const {getDeleter} = useDeleter(entityDescription.title.singular, commitDelete)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const {router} = useRouter()
    const listRoute = getDefaultListRoute(entityDescription)
    const escapeContext = useBackOnEscape(listRoute)

    const deleteAct = () => {
        getDeleter(state?.id, () => router.push(listRoute))()
    }

    return (
        <EscapeContext.Provider value={escapeContext}>
            <div className="flex flex-col gap-8 max-w-screen-2xl">
                <Breadcrumbs pages={[
                    {name: entityDescription.title.plural, href: listRoute},
                    {name: objectName ? objectName : `Neuer ${entityDescription.title.singular}`, href: ''}
                ]}/>
                <Form className="flex flex-col gap-8" onSubmit={onSubmit}>
                    <div className="border-b border-gray-900/10 pb-8">
                        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                            {children}
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6">
                        <button type="button" onClick={() => setDeleteConfirmationOpen(true)}>
                            <TrashIcon className="h-6 w-6"/>
                        </button>
                        <Link to={listRoute} className="text-sm font-semibold leading-6 text-gray-900">
                            Schliessen
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Speichern
                        </button>
                    </div>
                </Form>
                <DeleteConfirmation
                    title={entityDescription.title.singular}
                    demonstrativePronoun={entityDescription.title.demonstrativPronoun}
                    open={deleteConfirmationOpen}
                    onDelete={deleteAct}
                    onClose={() => setDeleteConfirmationOpen(false)}
                />
            </div>
        </EscapeContext.Provider>
    )
}
