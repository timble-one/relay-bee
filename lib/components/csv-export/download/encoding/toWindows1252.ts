import {toSingleByteEncoding} from "./_toSingleByteEncoding.ts";

export const toWindows1252 = (text: string): ArrayBuffer => {
    return toSingleByteEncoding(text, characters, [
        {from: 0, to: 127},
        {from: 160, to: 255},
    ])
}

const characters: Record<string, number> = {
    '\u20AC': 128, // €
    '\u201A': 130, // ‚
    '\u0192': 131, // ƒ
    '\u201E': 132, // „
    '\u2026': 133, // …
    '\u2020': 134, // †
    '\u2021': 135, // ‡
    '\u02C6': 136, // ˆ
    '\u2030': 137, // ‰
    '\u0160': 138, // Š
    '\u2039': 139, // ‹
    '\u0152': 140, // Œ
    '\u017D': 142, // Ž
    '\u2018': 145, // ‘
    '\u2019': 146, // ’
    '\u201C': 147, // “
    '\u201D': 148, // ”
    '\u2022': 149, // •
    '\u2013': 150, // –
    '\u2014': 151, // —
    '\u02DC': 152, // ˜
    '\u2122': 153, // ™
    '\u0161': 154, // š
    '\u203A': 155, // ›
    '\u0153': 156, // œ
    '\u017E': 158, // ž
    '\u0178': 159, // Ÿ
}
