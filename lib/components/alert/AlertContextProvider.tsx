import {ReactNode, useState} from "react";
import {AlertContext, AlertType} from "./AlertContext.ts";

export const AlertContextProvider = ({children}: {children: ReactNode}) => {
    const [alerts, setAlerts] = useState<AlertType[]>([]);
    return (
        <AlertContext.Provider value={{alerts, setAlerts}}>
            {children}
        </AlertContext.Provider>
    )
}