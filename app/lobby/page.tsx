import MainContent from "@/components/MainContent/MainContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Casino Portal | Lobby",
  description: "Browse through the hottest games through the Casino Lobby!"
}

export default function Home() {

  return (
    <main className="grid grid-cols-3 h-[calc(100vh-48px)]">
      <MainContent />
    </main>
  )
}
