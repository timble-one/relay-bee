import {useContext, useEffect, useRef} from "react";
import isVisible from "../../../util/isVisible.ts";
import {EndlessScrollContext} from "./EndlessScrollContext.ts";

type Props = {
    trigger: () => void
    isActive: boolean
}

export function ScrollVisibilityTrigger({trigger, isActive}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const context = useContext(EndlessScrollContext);
    const scrollListener = () => {
        const currentRef = ref.current;
        isActive && currentRef && isVisible(currentRef) && trigger();
    }
    useEffect(() => {
        context.setScrollListener(scrollListener);
    }, [isActive]);
    return (
        <div ref={ref}>
            <div className="h-1"></div>
        </div>
    )
}