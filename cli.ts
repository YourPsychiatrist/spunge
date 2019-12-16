#!/usr/bin/env node

import {
    Interface as InputSource,
    createInterface as usingInput
} from 'readline'
import { sponge } from './sponge'

// i and L are special cases, they don't sponge 
// well (I and l are often confused)
const SpecialSponges: Map<string, string> = new Map(Object.entries({
    i: 'i',
    l: 'L',
}))

function main(is: InputSource) {
    is.on('line', line => {
        is.close() // exit after reading one line
        if (line.length > 0)
            console.log(sponge(line.toLowerCase(), SpecialSponges))
    })
}

main(usingInput({ input: process.stdin }))