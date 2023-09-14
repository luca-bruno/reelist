import MainContent from "@/components/MainContent/MainContent"

export default function Home() {

  return (
    <main>
      <div className="grid grid-cols-3 h-[calc(100vh-48px)]">
        <MainContent />
      </div>
    </main>
  )
}
