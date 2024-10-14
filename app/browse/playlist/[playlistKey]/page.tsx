import BrowseContainer from "@/components/Browse"

// const BrowsePlaylistPage = ({ params }: { params?: { key: string } }) => <BrowseContainer {...{ params }} />
const BrowsePlaylistPage = ({ params, searchParams }: { params?: { id: string }; searchParams?: { query: string } }) => (
    <BrowseContainer {...{ params, searchParams }} />
)

export default BrowsePlaylistPage
