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

export type { movieSummaryTypes, ratingsTypes, movieFullTypes }
