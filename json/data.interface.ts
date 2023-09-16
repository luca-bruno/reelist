interface dataSubtypes {
    id: string
    title: string
    type: string
}

interface dataTypes {
    id: string
    name: string
    providerTitle: string
    iconSmall: string
    iconLarge?: string
    background?: string
    hasAgeRestriction: number
    categories: string[]
    cats: dataSubtypes[]
    features: string[]
    feats: dataSubtypes[]
    themes: string[]
    thms: dataSubtypes[]
}

export type { dataTypes , dataSubtypes }
