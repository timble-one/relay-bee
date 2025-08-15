import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";
import {useContext} from "react";
import {RefetchListContext} from "../refetch-list-context/RefetchListContext.ts";
import {useAlerts} from "../../alert/useAlerts.ts";
import {useRouter} from "../../../util/router/util.ts";
import {useEnv} from "../../../util/environment/useEnv.ts";

type Props<T> = {
    getIdFromResponse: (response: T) => string | undefined,
    reducer: (id: string) => void
}

export const useNewEntityHandler = <T extends object>({getIdFromResponse, reducer}: Props<T>) => {
    const {wrapWithErrorAlerts} = useErrorWrapper()
    const {match, router} = useRouter()
    const refetchListContext = useContext(RefetchListContext);
    const {addAlert} = useAlerts()
    const {adminBasePath} = useEnv()

    return (
        wrapWithErrorAlerts<T>({onSuccess: (response) => {
            refetchListContext.setRefetchNeeded(true)
            const id = getIdFromResponse(response)
            if (id) {
                const parentElements = match.location.pathname
                    .slice(adminBasePath.length)
                    .split('/')
                    .slice(0, -1)
                router.replace([...parentElements, id].join('/'))
                reducer(id)
                addAlert('Erfolgreich erstellt!', 'SUCCESS')
            } else {
                addAlert('Beim Speichern ist etwas schief gelaufen!', 'ERROR')
            }
        }})
    )
}
