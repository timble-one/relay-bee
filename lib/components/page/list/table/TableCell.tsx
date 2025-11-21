import React from "react";
import {twMerge} from "tailwind-merge";

export function TableCell({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <td className={twMerge(
            "whitespace-nowrap text-sm text-me text-gray-900 overflow-hidden overflow-ellipsis",
            "py-4 pl-4 pr-3 sm:pl-6 lg:pl-4",
            className
        )}>
            {children}
        </td>
    )
}
