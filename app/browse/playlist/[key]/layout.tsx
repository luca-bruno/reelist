import Navbar from "@/components/Navbar"

export default function PlaylistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
