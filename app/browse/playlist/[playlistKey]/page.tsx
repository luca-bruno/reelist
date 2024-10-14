import { Suspense } from "react"
import BrowseContainer from "@/components/Browse"

// const BrowsePlaylistPage = ({ params }: { params?: { key: string } }) => <BrowseContainer {...{ params }} />
const BrowsePlaylistPage = ({ params, searchParams }: { params?: { id: string }; searchParams?: { query: string } }) => (
  <Suspense>
    <BrowseContainer {...{ params, searchParams }} />
  </Suspense>
)

export default BrowsePlaylistPage
