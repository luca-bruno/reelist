import Navbar from "@/components/Navbar"

export default function BrowseLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
