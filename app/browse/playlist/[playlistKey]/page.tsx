import { Suspense } from "react"
import BrowseContainer from "@/components/Browse"

// const BrowsePlaylistPage = ({ params }: { params?: { key: string } }) => <BrowseContainer {...{ params }} />
const BrowsePlaylistPage = ({
  params,
  searchParams
}: {
  params?: { id: string }
  searchParams?: { query: string; year: string; genres: string; language: string; countries: string; page: string }
}) => (
  <Suspense>
    <BrowseContainer {...{ params, searchParams }} />
  </Suspense>
)

export default BrowsePlaylistPage
