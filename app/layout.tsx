import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reelist",
  description: "Your personal movie hub - discover, personalise, show off. Powered by the TMDb API."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`max-w-[1280px] m-auto w-full h-auto overflow-y-auto overflow-x-hidden ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
