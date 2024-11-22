import {ReactNode} from "react";

export function TableBody({children}: {children: ReactNode}) {
    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {children}
        </tbody>
    );
}