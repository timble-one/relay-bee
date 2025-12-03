import {ReactNode} from "react";
import {Link} from "./link/Link.tsx";

type Props = {
    children: ReactNode,
    outsideReactRouter?: boolean
    logo?: ReactNode
}

export function PromptLayout({children, outsideReactRouter, logo}: Props) {
    return <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <LogoLink outsideReactRouter={outsideReactRouter} logo={logo} />
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    </section>
}

function LogoLink({outsideReactRouter, logo}: {outsideReactRouter?: boolean, logo?: ReactNode}) {
    const linkClasses = 'flex gap-4 items-center mb-6 text-2xl font-semibold text-gray-900';
    if (outsideReactRouter) {
        return <a href="#" className={linkClasses}>{logo}</a>
    }
    return <Link to="#" className={linkClasses}>{logo}</Link>
}
