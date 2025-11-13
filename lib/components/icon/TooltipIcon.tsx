import {QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import {arrow, autoPlacement, FloatingArrow, offset, useFloating, useHover, useInteractions} from "@floating-ui/react";
import {ReactNode, useRef, useState} from "react";

type Props = {children: ReactNode, iconClasses?: string};

export default function TooltipIcon({children: text, iconClasses}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef(null);
    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            autoPlacement(),
            offset(12),
            arrow({
                element: arrowRef,
            })
        ],
    });
    const hover = useHover(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([hover]);
    return (
        <>
            <div className={iconClasses}>
                <QuestionMarkCircleIcon ref={refs.setReference} {...getReferenceProps()} aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                />
            </div>
            {isOpen && (
                <div className="bg-indigo-100 rounded px-4 py-1"
                     ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}
                >
                    <FloatingArrow ref={arrowRef} context={context} className="fill-indigo-100"/>
                    <p className="text-sm">{text}</p>
                </div>
            )}
        </>
    )
}
