import {ReactNode} from "react";

export const WideSection = ({children}: {children: ReactNode}) => {
    return (
        <section className="col-span-full">
            <div className="grid grid-cols-12 gap-x-6 gap-y-8 p-8 shadow rounded-md">
                {children}
            </div>
        </section>
    )
}

export const CompactSection = ({children}: { children: ReactNode }) => {
    return (
        <section className="col-span-full xl:col-span-6">
            <div className="grid grid-cols-12 xl:grid-cols-6 gap-x-6 gap-y-8 p-8 shadow rounded-md">
                {children}
            </div>
        </section>
    )
}

export const HybridSection = ({children}: {children: ReactNode}) => {
    return (
        <section className="col-span-full 2xl:col-span-6">
            <div className="grid grid-cols-12 2xl:grid-cols-6 gap-x-6 gap-y-8 p-8 shadow rounded-md">
                {children}
            </div>
        </section>
    )
}
