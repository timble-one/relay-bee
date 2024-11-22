import {createContext} from "react";

export type AlertFlavourType = 'ERROR' | 'WARNING' | 'INFORMATION' | 'SUCCESS';

export type AlertType = {
    text: string,
    type: AlertFlavourType,
    createdAt: number
};

type AlertContextType = {
    alerts: AlertType[],
    setAlerts: (setStateAction: (prevState: AlertType[]) => AlertType[]) => void
};

export const AlertContext = createContext<AlertContextType>({alerts: [], setAlerts: () => undefined});
