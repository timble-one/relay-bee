import {ReactNode, useContext} from "react";
import clsx from "clsx";
import {SortingContext} from "./sort/SortingContext.ts";
import SortLink from "./sort/SortLink.tsx";

type Props = {
    children?: ReactNode,
    buttonColumn?: boolean,
    sortKey?: string
};

const classNamesDefault = 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-4';
const classNamesButtonColumn = 'relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8';

export function TableHeader({children, buttonColumn = false, sortKey}: Props) {
    return (
        <th scope="col"
            className={clsx('py-3.5', buttonColumn ? classNamesButtonColumn : classNamesDefault)}
        >
            <TableHeaderBody sortingKey={sortKey}>
                {children}
            </TableHeaderBody>
        </th>
    );
}

type TableHeaderBodyProps = {
    children: ReactNode,
    sortingKey?: string
};

function TableHeaderBody({children, sortingKey}: TableHeaderBodyProps) {
    const sortingContext = useContext(SortingContext);
    if (sortingContext && sortingKey) {
        return (
            <SortLink
                order={sortingContext.sortingCombination[sortingKey]}
                onSort={sortingContext.sort(sortingKey)}
            >
                {children}
            </SortLink>
        )
    }
    return children;
}
