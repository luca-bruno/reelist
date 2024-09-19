interface movieSummaryTypes {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface ratingsTypes {
  Source: string
  Value: string
}

interface movieFullTypes {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: ratingsTypes
  Metascore: string
  imdbRating: string
  imdbVotes: string
  BoxOffice: string
  Production: string
}



interface Result {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface Root {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}


export type { movieSummaryTypes, ratingsTypes, movieFullTypes, Result, Root }
