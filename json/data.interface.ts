interface dataSubtypes {
  id: string
  title: string
  type: string
}

interface dataTypes {
  id: string
  name: string
  provider_title: string
  icon_2: string
  icon_3?: string
  background?: string
  has_age_restriction: number
  categories: string[]
  cats: dataSubtypes[]
  features: string[]
  feats: dataSubtypes[]
  themes: string[]
  thms: dataSubtypes[]
}

export type { dataTypes, dataSubtypes }
