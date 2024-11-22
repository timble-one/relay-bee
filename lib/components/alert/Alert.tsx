import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon
} from '@heroicons/react/20/solid'
import {Transition} from "@headlessui/react";
import {useState} from "react";
import {AlertFlavourType, AlertType} from "./AlertContext.tsx";

export default function Alert({alert, onClose}: {alert: AlertType, onClose: () => void}) {
    const [show, setShow] = useState(true);
    return (
        <div
            aria-live="assertive"
            className="pointer-events-none inset-0 flex items-end px-4 sm:items-start"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                <Transition show={show} afterLeave={onClose}>
                    <div
                        className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Icon type={alert.type} />
                                </div>
                                <div className="ml-3 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">{alert.text}</p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShow(false)
                                        }}
                                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Schliessen</span>
                                        <XMarkIcon aria-hidden="true" className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}

function Icon ({type}: {type: AlertFlavourType}) {
    switch (type) {
        case 'SUCCESS': return <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400"/>;
        case 'ERROR': return <XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />;
        case 'WARNING': return <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-yellow-400" />;
        case 'INFORMATION': return <InformationCircleIcon aria-hidden="true" className="h-6 w-6 text-blue-400" />;
    }
}