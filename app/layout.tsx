import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

// Prevent Font Awesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"

const inter = Inter({ subsets: ["latin"] })

config.autoAddCss = false

export const metadata: Metadata = {
  title: "Reelist",
  description: "Your personal movie hub - discover, personalise, show off. Powered by the TMDb API."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { className: interFont } = inter

  return (
    <html lang="en">
      <body className={`max-w-[1280px] m-auto w-full h-auto overflow-y-auto overflow-x-hidden ${interFont}`}>{children}</body>
    </html>
  )
}
