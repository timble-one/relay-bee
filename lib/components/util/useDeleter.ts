import {useAlerts} from "../alert/useAlerts.ts";
import {useErrorWrapper} from "../alert/useErrorWrapper.ts";
import {PayloadError} from "relay-runtime";

export type DeleteListener = (config: {
    onCompleted: (response: object, errors: PayloadError[] | null) => void,
    variables: {id: string}
}) => void

export default function useDeleter(title: string, onDelete: DeleteListener) {
    const {addAlert} = useAlerts();
    const {wrapWithErrorAlerts} = useErrorWrapper();

    return {
        getDeleter: (id: string | undefined, onSuccess?: () => void) => {
            if (id) {
                return () => {
                    onDelete({onCompleted: wrapWithErrorAlerts({onSuccess}), variables: {id}});
                    addAlert(title + ' erfolgreich gelöscht!', "SUCCESS");
                };
            }
            return () => undefined;
        }
    };
}