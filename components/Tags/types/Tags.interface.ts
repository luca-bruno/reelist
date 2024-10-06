import { movieTypes } from "@/types/movie.interface"

interface Tag<T> {
  title: string
  payload?: T
}

type directorTagType = Tag<movieTypes["credits"]["crew"]>
type starringTagType = Tag<movieTypes["credits"]["cast"]>
type genreTagType = Tag<movieTypes["genres"]>
type languageTagType = Tag<movieTypes["spoken_languages"]>

export type TagsTypes = languageTagType | genreTagType

export interface TagGroups {
  directorTags?: directorTagType
  starringTags?: starringTagType
  genreTags?: genreTagType
  languageTags?: languageTagType
}
