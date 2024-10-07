export interface filterTypes {
  genres?: {
    name: string
    id: number
  }[]
  origin_country?: {
    nativeName: string
    englishName: string
    isoCode: string
  }[]
  original_language?: {
    nativeName: string
    englishName: string
    isoCode: string
  }
  year?: string
}

export interface filterParamTypes {
  genres?: string
  origin_country?: string
  original_language?: string
  year?: string
}
