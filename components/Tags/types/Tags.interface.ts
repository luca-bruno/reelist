import { castTypes, creditTypes, movieTypes, spokenLanguageTypes } from "@/types/movie.interface"

interface Tag<T> {
  title: string
  payload?: T
}

type directorTagType = Tag<{ name: creditTypes["name"] }[]>
type starringTagType = Tag<{ name: (creditTypes & castTypes)["name"] }[]>
type genreTagType = Tag<movieTypes["genres"]>
type languageTagType = Tag<{ name: spokenLanguageTypes["name"] }[]>

export type TagsTypes = directorTagType | starringTagType | genreTagType | languageTagType

export interface TagGroups {
  directorTags?: directorTagType
  starringTags?: starringTagType
  genreTags?: genreTagType
  languageTags?: languageTagType
}
