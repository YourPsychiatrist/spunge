type char = string

/**
 * A version of Array.prototype.map for strings.
 * @param str The string to map f over.
 * @param f The character transformation to apply to each charachter.
 */
function map(str: string, f: (c: char) => char): string {
    return str.split('').map(f).join('')
}

/**
 * Sponges a single char.
 * @param sponges A map of fixed sponges that must be mapped explicitly.
 * @param c The character to map.
 */
function spongeChar(sponges: Map<char, char>, c: char): char {
    if (sponges.has(c))
        return sponges.get(c)
    else
        return Math.random() > 0.5 ?
            c : c.toUpperCase()
}

/**
 * The ratio of uppercase to lowercase letters. The quality of a sponge
 * increases with the ratio approaching 0.5.
 * @param word The word for which to determine the sponge ration.
 */
function spongedRatio(word: string): number {
    function binaryAccumulator(acc: number, curr: char): number {
        if (curr.toUpperCase() == curr)
            return acc + 1
        else return acc
    }

    return word.split('').reduce(binaryAccumulator, 0) / word.length
}

/**
 * Calculates the sponged ratio of the supplied word and determines
 * the quality with respect to the word length.
 * @param word The word to check for sponge quality.
 */
function ratioAcceptable(word: string): boolean {
    const ratio = spongedRatio(word)
    if (word.length == 1)
        return true
    else if (word.length == 2 && ratio == .5)
        return true
    else if (word.length == 3 && ratio > .3 && ratio < .7)
        return true
    else {
        const epsilon = .2
        return Math.abs(.5 - ratio) < epsilon
    }
}

/**
 * Sponges the supplied text, respecting the map of special sponges.
 * @param text The text to sponge.
 * @param specialSponges A map of characters that are sponged explicitly. This is
 *                       handy for letters that don't sponge well such as i -> I.
 */
export function sponge(text: string, specialSponges: Map<char, char> = new Map()): string {
    const _spongeChar = spongeChar.bind(null, specialSponges)

    return text
        .split(' ')
        .map(curr => {
            let sponged = map(curr, _spongeChar)
            while (!ratioAcceptable(sponged)) {
                sponged = map(curr, _spongeChar)
            }
            return sponged
        })
        .join(' ')
}