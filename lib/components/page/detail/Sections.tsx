import {ReactNode} from "react";
import clsx from "clsx";

const classes = 'grid grid-cols-12 gap-x-6 gap-y-8 p-8 shadow rounded-md border-gray-200 border'

export const WideSection = ({children}: {children: ReactNode}) => {
    return (
        <section className="col-span-full">
            <div className={classes}>
                {children}
            </div>
        </section>
    )
}

export const CompactSection = ({children}: { children: ReactNode }) => {
    return (
        <section className="col-span-full xl:col-span-6">
            <div className={clsx(classes, 'xl:grid-cols-6')}>
                {children}
            </div>
        </section>
    )
}

export const HybridSection = ({children}: {children: ReactNode}) => {
    return (
        <section className="col-span-full 2xl:col-span-6">
            <div className={clsx(classes, '2xl:grid-cols-6')}>
                {children}
            </div>
        </section>
    )
}
