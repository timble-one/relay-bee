import { HomeIcon } from '@heroicons/react/20/solid'
import {Link} from "./Link.tsx";

export default function Breadcrumbs({pages}: {pages: {name: string, href: string}[]}) {
    return (
        <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow border-gray-200 border">
                <li className="flex">
                    <div className="flex items-center">
                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name} className="flex">
                        <div className="flex items-center">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 44"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                className="h-full w-6 flex-shrink-0 text-gray-200"
                            >
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            <Link
                                to={page.href}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {page.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
