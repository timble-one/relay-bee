import React from "react";
import clsx from "clsx";

export function TableCell({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <td className={clsx("whitespace-nowrap py-4 pl-4 pr-3 text-sm text-me text-gray-900 sm:pl-6 lg:pl-4", className)}>
            {children}
        </td>
    )
}