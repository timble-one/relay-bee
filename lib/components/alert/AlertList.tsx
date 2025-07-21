import Alert from "./Alert.tsx";
import {useAlerts} from "./useAlerts.ts";

export function AlertList() {
    const {alerts, getAlertCloser} = useAlerts();
    return (
        <div className="z-10 fixed right-4 top-6 flex flex-col gap-4">
            {alerts.map(((a, i) => <Alert alert={a} onClose={() => getAlertCloser(a)} key={i}/>))}
        </div>
    );
}
