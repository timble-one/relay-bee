import {createContext} from "react";

type DeleteContext = {
    deleteConfirmationId: string | undefined;
    setDeleteConfirmationId: (id: string | undefined) => void;
};

export const DeleteContext = createContext<DeleteContext | undefined>(undefined);