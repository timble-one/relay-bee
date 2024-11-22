import {createContext} from "react";

export type SubmitListener = () => boolean;

type FormContextType = {
    addSubmitListener: (listener: SubmitListener) => void,
    removeSubmitListener: (listener: SubmitListener) => void,
};

export const FormContext = createContext<FormContextType>({
    addSubmitListener: () => undefined,
    removeSubmitListener: () => undefined}
);