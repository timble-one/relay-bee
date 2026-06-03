import {toMacRoman} from "./encoding/toMacRoman.ts";
import {toWindows1252} from "./encoding/toWindows1252.ts";

export const downloadCsv = (csv: string, fileName: string) => {
    const url = URL.createObjectURL(toCsvBlob(csv))
    triggerDownload(url, fileName)
    URL.revokeObjectURL(url)
}

const toCsvBlob = (csv: string): Blob => {
    return navigator.userAgent.toLowerCase().includes('mac os')
        ? new Blob([toMacRoman(csv)], {type: 'text/csv;charset=x-mac-roman'})
        : new Blob([toWindows1252(csv)], {type: 'text/csv;charset=windows-1252'})
}

const triggerDownload = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.append(link)
    link.click()
    link.remove()
}
