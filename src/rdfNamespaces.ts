//==============================================================================
//==============================================================================

import { NamespacedUri, namespaceMap } from './namespace'

//==============================================================================

export const DCT_URI = 'http://purl.org/dc/terms/'
export const OWL_URI = 'http://www.w3.org/2002/07/owl#'
export const RDF_URI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
export const RDFS_URI = 'http://www.w3.org/2000/01/rdf-schema#'
export const XSD_URI = 'http://www.w3.org/2001/XMLSchema#'

//==============================================================================

export const DCT = new NamespacedUri('dcterms', DCT_URI)
export const OWL = new NamespacedUri('owl', OWL_URI)
export const RDF = new NamespacedUri('rdf', RDF_URI)
export const RDFS = new NamespacedUri('rdfs', RDFS_URI)
export const XSD = new NamespacedUri('xsd', XSD_URI)

//==============================================================================

export const rdfNamespaces: NamespacedUri[] = [
    DCT, OWL, RDF, RDFS, XSD
]

//==============================================================================

namespaceMap.update(rdfNamespaces)

//==============================================================================
//==============================================================================
