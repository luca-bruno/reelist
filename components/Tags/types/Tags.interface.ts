import { movieTypes } from "@/types/movie.interface"

interface tagTitleType {
  title: string
}

export interface TagsTypes {
  languageTags?: tagTitleType & { payload: movieTypes["spoken_languages"] }
  genreTags?: tagTitleType & { payload: movieTypes["spoken_languages"] }
}
