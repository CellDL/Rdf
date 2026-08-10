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

export class NamespacedUri {
    #nsUri: string
    #prefix: string

    constructor(prefix: string, nsUri: string) {
        this.#prefix = prefix
        this.#nsUri = nsUri
    }

    get prefix(): string {
        return this.#prefix
    }

    get nsUri(): string {
        return this.#nsUri
    }

    uri(ln: string): NamedNode {
        return namedNode(this.#nsUri + (ln || ''))
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

    get namespaces(): Record<string, string> {
        return Object.fromEntries(this.entries())
    }

    add(namespace: NamespacedUri) {
        this.set(namespace.prefix, namespace.nsUri)
    }

    curieSuffix(NS: NamespacedUri, term: string | NamedNode): string {
        const curie: string = isNamedNode(term) ? (<NamedNode>term).uri : <string>term
        const fullUri = this.expandCurie(curie)
        const nsUri = NS.uri('').uri
        if (fullUri.startsWith(nsUri)) {
            return fullUri.slice(nsUri.length)
        }
        return curie
    }

    expandCurie(curie: string): string {
        const parts = curie.split(':')
        if (parts.length > 1 && this.has(parts[0])) {
            // @ts-expect-error: `parts[0]` is defined
            return `${namespaceMapping.get(parts[0])}${parts.slice(1).join(':')}`
        }
        return curie
    }

    getCurie(term: string | NamedNode): string {
        const fullUri: string = isNamedNode(term) ? (<NamedNode>term).uri : <string>term
        for (const [prefix, nsUri] of this.entries()) {
            if (fullUri.startsWith(nsUri)) {
                return `${prefix}:${fullUri.slice(nsUri.length)}`
            }
        }
        return fullUri
    }

    update(namespaces: NamespacedUri[]) {
        for (const ns of namespaces) {
            this.set(ns.prefix, ns.nsUri)
        }
    }
}

//==============================================================================

export const namespaceMap = NamespaceMap.instance

//==============================================================================


//==============================================================================
//==============================================================================
