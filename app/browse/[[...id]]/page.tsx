import BrowseContainer from "@/components/Browse"

const BrowsePage = ({ params, searchParams }: { params?: { id: string }; searchParams?: { query: string } }) => (
  <BrowseContainer {...{ params, searchParams }} />
)

export default BrowsePage
