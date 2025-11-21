import {ReactNode, useState} from "react";
import {ScrollVisibilityTrigger} from "../../../util/endless-scroll/ScrollVisibilityTrigger.tsx";
import Spinner from "../../../icon/Spinner.tsx";
import DeleteConfirmation from "../../../dialog/delete/DeleteConfirmation.tsx";
import useDeleter, {DeleteListener} from "../../../util/useDeleter.ts";
import {DeleteContext} from "../../../dialog/delete/DeleteContext.ts";
import {GenericSortingCombination, SortFunction} from "./sort/useSorting.ts";
import {SortingContext} from "./sort/SortingContext.ts";
import {SortingCombination} from "./sort/useSortingCombination.ts";
import {ifPresent} from "tssentials";

export function AutoLoadTable<SORTING_ORDER extends GenericSortingCombination>(props: {
    title: string,
    demonstrativePronoun: string,
    children: ReactNode,
    hasNext: boolean,
    isLoadingNext: boolean,
    onLoadNext: (count: number) => void,
    onDelete: DeleteListener,
    sortFunction?: SortFunction<SORTING_ORDER>,
    sortingCombination?: SortingCombination
}) {
    const {title, isLoadingNext} = props;
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | undefined>();
    const {getDeleter} = useDeleter(title, props.onDelete);
    return (
        <>
            <SortingContext.Provider value={
                ifPresent(props.sortFunction, f =>
                ifPresent(props.sortingCombination, c =>
                    ({sort: f, sortingCombination: c})
            ))}>
                <DeleteContext.Provider value={{deleteConfirmationId, setDeleteConfirmationId}}>
                    <table className="table-fixed w-full min-w-full divide-y divide-gray-300">
                        {props.children}
                    </table>
                </DeleteContext.Provider>
            </SortingContext.Provider>
            <ScrollVisibilityTrigger
                trigger={() => props.onLoadNext(20)}
                isActive={!isLoadingNext && props.hasNext}
            />
            {isLoadingNext &&
              <div className="w-8 m-auto"><Spinner/></div>
            }
            <DeleteConfirmation
                title={title}
                demonstrativePronoun={props.demonstrativePronoun}
                open={deleteConfirmationId !== undefined}
                onClose={() => setDeleteConfirmationId(undefined)}
                onDelete={getDeleter(deleteConfirmationId)}
            />
        </>
    )
}
