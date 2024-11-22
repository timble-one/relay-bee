import React, {ReactNode, useTransition} from "react";
import clsx from "clsx";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";
import {SortKey, sortKeys} from "./SortKey.ts";
import Spinner from "../../../../icon/Spinner.tsx";

type TableOrderLinkProps = {
    children: ReactNode,
    order?: SortKey,
    onSort: (order?: SortKey) => void,
    defaultOrder?: SortKey
};

export default function SortLink({children, order, onSort}: TableOrderLinkProps) {
    const orders: (SortKey | undefined)[] = [...sortKeys, undefined];
    const [isPending, startTransition] = useTransition();
    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        startTransition(() => {
            e.preventDefault();
            onSort(orders[(orders.indexOf(order) + 1) % 3]);
        });
    };
    return (
        <a href={isPending ? undefined : '#'} onClick={onClick} className="group inline-flex">
            {children}
            <span className={clsx(
                'ml-2 flex-none rounded',
                order ? 'bg-gray-100 text-gray-900 group-hover:bg-gray-200' : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                isPending ? 'transition-opacity opacity-50 duration-300' : 'transition-none opacity-100'
            )}>
                {order === 'DESC' ?
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5"/> :
                    <ChevronUpIcon aria-hidden="true" className="h-5 w-5"/>}
            </span>
            <div className="mx-2 mt-0.5 w-4">
                <Spinner visible={isPending}/>
            </div>
        </a>
    );
}
