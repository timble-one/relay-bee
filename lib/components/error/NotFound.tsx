import {ifPresent} from "tssentials";

export const NotFound = ({message}: {message?: string}) => {
    return (
        <div className="flex-col justify-center p-32">
            <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
            {ifPresent(message, m => <p>{m}</p>)}
        </div>
    )
}