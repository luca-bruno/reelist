export interface genreTypes {
  id: number
  name: string
}

export interface productionCompanyTypes {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

export interface productionCountryTypes {
  iso_3166_1: string
  name: string
}

export interface ageRatingTypes {
  results: {
    iso_3166_1: string
    release_dates: {
      certification: string
      descriptors: string[]
      iso_639_1: string
      note: string
      release_date: string
      type: number
    }[]
  }[]
}

export interface spokenLanguageTypes {
  english_name: string
  iso_639_1: string
  name: string
}

export interface creditTypes {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
}

export interface castTypes {
  cast_id: number
  character: string
  order: number
}

export interface crewTypes {
  department: string
  job: string
}

export interface movieTypes {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string | null
  budget: number
  genres: genreTypes[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: productionCompanyTypes[]
  production_countries: productionCountryTypes[]
  release_date: string
  release_dates: ageRatingTypes
  revenue: number
  runtime: number
  spoken_languages: spokenLanguageTypes[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: {
    cast: (creditTypes & castTypes)[]
    crew: (creditTypes & crewTypes)[]
  }
}
