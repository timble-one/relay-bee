import {PayloadError} from "relay-runtime";
import {useAlerts} from "./useAlerts.ts";

export const useErrorWrapper = () => {
    const {addAlert} = useAlerts();
    return {
        wrapWithErrorAlerts:
            <T extends object,>({onSuccess}: { onSuccess?: (response: T) => void }) =>
            (response: T, errors: PayloadError[] | null) =>
            {
                if (errors) {
                    errors.forEach((error) => {
                        addAlert(error.message, 'ERROR');
                    });
                } else {
                    onSuccess && onSuccess(response);
                }
            },
        handleError: (error: Error) => {
            console.error(error);
            addAlert(error.message, 'ERROR');
        }
    };
}