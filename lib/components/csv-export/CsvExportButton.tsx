import {ArrowDownTrayIcon} from "@heroicons/react/20/solid";
import {useState} from "react";

type Props = {
    onExport: () => Promise<void> | void
}

const buttonClasses = `
    inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-700 shadow-sm
    ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    disabled:cursor-wait disabled:opacity-60
`

export const CsvExportButton = ({onExport}: Props) => {
    const {exportCsv, exporting} = useCsvExport(onExport)
    return (
        <button
            type="button"
            onClick={exportCsv}
            disabled={exporting}
            title="CSV Export"
            aria-label="CSV Export"
            className={buttonClasses}
        >
            <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
        </button>
    )
}

const useCsvExport = (onExport: Props["onExport"]) => {
    const [exporting, setExporting] = useState(false)
    const exportCsv = async () => {
        if (exporting) {
            return
        }
        setExporting(true)
        try {
            await onExport()
        } finally {
            setExporting(false)
        }
    }
    return {exportCsv, exporting}
}
