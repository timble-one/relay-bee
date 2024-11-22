export default function isVisible(e: HTMLElement) {
    const elemCenter = {
        x: e.getBoundingClientRect().left + e.offsetWidth / 2,
        y: e.getBoundingClientRect().top + e.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer: Element | undefined | null
        = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === e) return true;
        pointContainer = pointContainer?.parentElement;
    } while (pointContainer);
    return false;
}