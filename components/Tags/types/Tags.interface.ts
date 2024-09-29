import { movieTypes } from "@/types/movie.interface"

interface Tag<T> {
  title: string
  payload?: T
}

type languageTagType = Tag<movieTypes["spoken_languages"]>
type genreTagType = Tag<movieTypes["genres"]>

export type TagsTypes = languageTagType | genreTagType

export interface TagGroups {
  languageTags?: languageTagType
  genreTags?: genreTagType
}
