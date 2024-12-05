import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {useRouter} from "found";
import {useContext} from "react";
import {RefetchListContext} from "../refetch-list-context/RefetchListContext.ts";
import {useAlerts} from "../../alert/useAlerts.ts";

type Props<T> = {
    getIdFromResponse: (response: T) => string | undefined,
    reducer: (id: string) => void
}

export const useNewEntityHandler = <T extends object>({getIdFromResponse, reducer}: Props<T>) => {
    const {wrapWithErrorAlerts} = useErrorWrapper()
    const {match, router} = useRouter()
    const refetchListContext = useContext(RefetchListContext);
    const {addAlert} = useAlerts()

    return (
        wrapWithErrorAlerts<T>({onSuccess: (response) => {
            refetchListContext.setRefetchNeeded(true)
            const id = getIdFromResponse(response)
            if (id) {
                const pathSegments = match.location.pathname.split('/')
                pathSegments.pop()
                const basePath = pathSegments.join('/')
                router.replace(`${basePath}/${id}`)
                reducer(id)
                addAlert('Erfolgreich erstellt!', 'SUCCESS')
            } else {
                addAlert('Beim Speichern ist etwas schief gelaufen!', 'ERROR')
            }
        }})
    )
}
