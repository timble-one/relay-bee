import {PencilIcon, TrashIcon} from "@heroicons/react/16/solid";
import {useContext} from "react";
import {DeleteContext} from "../../../dialog/delete/DeleteContext.ts";
import { Link } from "../../../Link.tsx";

export function TableButtons({rowId, editUrl}: {rowId: string, editUrl: string}) {
    const deleteContext = useContext(DeleteContext);
    return (
        <span className="isolate inline-flex rounded-md shadow-sm">
            <button
                type="button"
                className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                onClick={() => deleteContext?.setDeleteConfirmationId(rowId)}
            >
                <TrashIcon className="h5 w-5"/>
            </button>
            <Link
                className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                to={editUrl}
            >
                <PencilIcon className="h5 w-5"/>
            </Link>
        </span>
    );
}