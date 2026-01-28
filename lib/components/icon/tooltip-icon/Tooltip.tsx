import {ReactNode, useRef, useState} from "react";
import {
    arrow,
    autoPlacement,
    FloatingArrow,
    FloatingPortal,
    offset,
    useFloating,
    useHover,
    useInteractions
} from "@floating-ui/react";

type Props = {
    text: ReactNode,
    children: (props: {
        getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"],
        setReference: ReturnType<typeof useFloating>["refs"]["setReference"],
    }) => ReactNode,
};

export function Tooltip({text, children}: Props) {
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
            {children({getReferenceProps, setReference: refs.setReference})}
            {isOpen && (
                <FloatingPortal>
                    <div className="bg-indigo-100 rounded px-4 py-1"
                         ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}
                    >
                        <FloatingArrow ref={arrowRef} context={context} className="fill-indigo-100"/>
                        <p className="text-sm">{text}</p>
                    </div>
                </FloatingPortal>
            )}
        </>
    )
}