type CodeRange = {
    from: number
    to: number
}

export const toSingleByteEncoding = (
    text: string,
    characters: Record<string, number>,
    passthroughRanges: CodeRange[] = [{from: 0, to: 127}],
): ArrayBuffer => {
    const bytes = [...text].map(character => {
        const charCode = character.charCodeAt(0)
        return canPassThrough(charCode, passthroughRanges)
            ? charCode
            : characters[character] ?? 63
    })
    const buffer = new ArrayBuffer(bytes.length)
    new Uint8Array(buffer).set(bytes)
    return buffer
}

const canPassThrough = (charCode: number, passthroughRanges: CodeRange[]): boolean => {
    return passthroughRanges.some(({from, to}) => charCode >= from && charCode <= to)
}
