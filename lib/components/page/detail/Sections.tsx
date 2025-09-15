import clsx from "clsx";
import {HTMLProps} from "react";

const classes = 'grid grid-cols-12 gap-x-6 gap-y-8 p-8 shadow rounded-md border-gray-200 border'

export const WideSection = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <section {...props} className={clsx('col-span-full', props.className)}>
            <div className={classes}>
                {props.children}
            </div>
        </section>
    )
}

export const CompactSection = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <section {...props} className={clsx('col-span-full xl:col-span-6', props.className)}>
            <div className={clsx(classes, 'xl:grid-cols-6')}>
                {props.children}
            </div>
        </section>
    )
}

export const HybridSection = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <section {...props} className={clsx('col-span-full 2xl:col-span-6', props.className)}>
            <div className={clsx(classes, '2xl:grid-cols-6')}>
                {props.children}
            </div>
        </section>
    )
}
