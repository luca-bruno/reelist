import { Suspense } from "react"
import BrowseContainer from "@/components/Browse"

const BrowsePage = ({
  params,
  searchParams
}: {
  params?: { id: string }
  searchParams?: { query: string; year: string; genres: string; language: string; countries: string; name: string; page: string, movie: string }
}) => (
  <Suspense>
    <BrowseContainer {...{ params, searchParams }} />
  </Suspense>
)

export default BrowsePage
