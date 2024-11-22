import Dialog from "../../../../Dialog.tsx";

type Props = {
    title: string,
    demonstrativePronoun: string,
    open: boolean
    onClose: () => void,
    onDelete: () => void
};

export default function DeleteConfirmation({title, demonstrativePronoun, open, onClose, onDelete}: Props) {
    return (
        <Dialog open={open} onClose={onClose} title={`${title} löschen`}
            actionButtons={
                <button type="button"
                        onClick={() => {onDelete(); onClose();}}
                        className="rounded bg-red-600 px-6 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Löschen
                </button>
            }
        >
            <div className="pb-4">
                <p>Willst du {demonstrativePronoun} {title} wirklich löschen?</p>
            </div>
        </Dialog>
    )
}