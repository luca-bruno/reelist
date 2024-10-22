export interface BrowseContainerTypes {
  params?: { id?: string; playlistKey?: string }
  searchParams?: {
    query: string
    year: string
    genres: string
    language: string
    countries: string
    name: string
    page: string
  }
}
