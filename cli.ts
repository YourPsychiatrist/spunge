#!/usr/bin/env node

import {
    Interface as InputSource,
    createInterface as usingInput
} from 'readline'
import { sponge } from './sponge'
import * as yargs from 'yargs'
import * as clipboardy from 'clipboardy'

// i and L are special cases, they don't sponge 
// well (I and l are often confused)
const SpecialSponges: Map<string, string> = new Map(Object.entries({
    i: 'i',
    l: 'L',
}))

async function main({ argv }: yargs.Argv<{ c: boolean }>) {
    var line = argv._.length == 0 ?
        await readLine(usingInput({ input: process.stdin }))
        : argv._.join(" ")
    processLine(line, argv.c)
}

function readLine(is: InputSource): Promise<string> {
    return new Promise(resolve => {
        is.on('line', line => {
            is.close() // exit after reading one line
            resolve(line)
        })
    });
}

function processLine(line: string, copyToClipboard: boolean) {
    if (line.length > 0) {
        const sponged = sponge(line, SpecialSponges)
        console.log(sponged)
        if (copyToClipboard) {
            clipboardy.write(sponged)
            console.log('Text was copied to clipboard!')
        }
    }
}

main(yargs
    .scriptName("spunge")
    .usage("$0 <cmd> [args]")
    .option('c', {
        describe: 'whether to copy the sponge to the clipboard',
        default: false,
        boolean: true
    })
    .help()
)