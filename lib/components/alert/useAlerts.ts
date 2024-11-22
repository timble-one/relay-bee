import {useContext} from "react";
import {AlertContext, AlertType, AlertFlavourType} from "./AlertContext.ts";

export const useAlerts = () => {
    const {alerts, setAlerts} = useContext(AlertContext);

    const getCloser = (message: AlertType) =>
        () => setAlerts(messages => messages.filter(m => m.createdAt !== message.createdAt))
    ;

    const add = (text: string, type: AlertFlavourType = 'INFORMATION') => {
        const alert = {text, type, createdAt: Date.now()};
        setAlerts((alerts) => [...alerts, alert]);
        setTimeout(getCloser(alert), 5000);
    };

    return {alerts, addAlert: add, getAlertCloser: getCloser};
}

