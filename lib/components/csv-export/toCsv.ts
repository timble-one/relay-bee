export const toCsv = <T>(items: T[], headers: string[], toRow: (item: T) => unknown[]): string => {
    const rows = [headers, ...items.map(toRow)]
    const csv =
        rows
        .map(row =>
            row.map(toCsvCell).join(';')
        )
        .join('\r\n')
    return `sep=;\r\n${csv}`
}

const toCsvCell = (value: unknown): string => {
    const cell = value === undefined || value === null ? '' : String(value)
    return /[";\r\n]/.test(cell)
        ? `"${cell.split('"').join('""')}"`
        : cell
}
