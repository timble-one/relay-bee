import Breadcrumbs from "../../Breadcrumbs.tsx";
import {ReactNode} from "react";
import {Link} from "found";
import {EntityDescription} from "../../../EntityDescription.tsx";

type Props = {
    entityDescription: EntityDescription,
    children: ReactNode
};

export function ListPage({entityDescription, children}: Props) {
    return (
        <>
            <div className="flex justify-between items-center">
                <Breadcrumbs pages={[{name: entityDescription.title.plural, href: `/${entityDescription.handle}`}]}/>
                <Link
                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    to={`/${entityDescription.handle}/new`}
                >
                    {entityDescription.title.singular} hinzufügen
                </Link>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
