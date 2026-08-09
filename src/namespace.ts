/******************************************************************************

CellDL Editor

Copyright (c) 2022 - 2025 David Brooks

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

******************************************************************************/

import { isNamedNode, namedNode, type NamedNode } from './index'

//==============================================================================

export type NamespaceType = (_: string) => NamedNode

export class Namespace {
    #nsuri: string

    constructor(nsuri: string) {
        this.#nsuri = nsuri
    }

    uri(ln: string): NamedNode {
        return namedNode(this.#nsuri + (ln || ''))
    }
}

//==============================================================================

class NamespaceMap extends Map<string,string> {
    static #instance: NamespaceMap | null = null

    private constructor() {
        if (NamespaceMap.#instance) {
            throw new Error('Use `NamespaceMap.instance` instead of `new`')
        }
        super()
        NamespaceMap.#instance = this
    }

    static get instance() {
        if (!NamespaceMap.#instance) {
            NamespaceMap.#instance = new NamespaceMap()
        }
        return NamespaceMap.#instance
    }
}

//==============================================================================

export const namespaceMap = NamespaceMap.instance

//==============================================================================

export function curieSuffix(NS: Namespace, term: string | NamedNode): string {
    const curie: string = isNamedNode(term) ? (<NamedNode>term).uri : <string>term
    const fullUri = expandCurie(curie)
    const nsUri = NS.uri('').uri
    if (fullUri.startsWith(nsUri)) {
        return fullUri.slice(nsUri.length)
    }
    return curie
}

//==============================================================================

export function getCurie(term: string | NamedNode): string {
    const fullUri: string = isNamedNode(term) ? (<NamedNode>term).uri : <string>term
    for (const [prefix, nsUri] of namespaceMapping.entries()) {
        if (fullUri.startsWith(nsUri)) {
            return `${prefix}:${fullUri.slice(nsUri.length)}`
        }
    }
    return fullUri
}

//==============================================================================

export function expandCurie(curie: string): string {
    const parts = curie.split(':')
    // @ts-expect-error: `parts[0]` is defined
    if (parts.length > 1 && namespaceMapping.has(parts[0])) {
        // @ts-expect-error: `parts[0]` is defined
        return `${namespaceMapping.get(parts[0])}${parts.slice(1).join(':')}`
    }
    return curie
}

//==============================================================================
//==============================================================================
