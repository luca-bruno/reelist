import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GenresProvider } from "@/context/GenresContext"
import { CountriesProvider, LanguagesProvider } from "@/context"

// Prevent Font Awesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"

import { ClientCountryProvider } from "@/context/ClientCountryContext"
import { PlaylistProvider } from "@/context/PlaylistContext"
import { formatGenres, formatCountries, formatLanguages } from "@/components/Browse/utils/formatFilterPayloads"
import { HEADERS_ALLOW_ORIGIN } from "@/constants"

const inter = Inter({ subsets: ["latin"] })

config.autoAddCss = false

export const metadata: Metadata = {
  title: "Reelist",
  description: "Your personal movie hub - discover, personalise, show off. Powered by the TMDb and JustWatch APIs."
}

async function fetchGenresCountriesLanguages() {
  const [genresResponse, countriesResponse, languagesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, { headers: HEADERS_ALLOW_ORIGIN.headers, next: { revalidate: 3600 } }), // Cache for 1 hour
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries`, { headers: HEADERS_ALLOW_ORIGIN.headers, next: { revalidate: 3600 } }), // Cache for 1 hour
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`, { headers: HEADERS_ALLOW_ORIGIN.headers, next: { revalidate: 3600 } }) // Cache for 1 hour
  ])

  const [{ genres: genresResponseData }, countriesResponseData, languagesResponseData] = await Promise.all([
    genresResponse.json(),
    countriesResponse.json(),
    languagesResponse.json()
  ])

  const formattedGenres = formatGenres(genresResponseData)
  const formattedCountries = formatCountries(countriesResponseData)
  const formattedLanguages = formatLanguages(languagesResponseData)

  return { formattedGenres, formattedCountries, formattedLanguages }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { className: interFont } = inter

  const { formattedGenres, formattedCountries, formattedLanguages } = await fetchGenresCountriesLanguages()

  // TODO: this is a temporary fix to avoid redundant calls per url change - move these out of layout
  return (
    <ClientCountryProvider>
      <PlaylistProvider>
        <LanguagesProvider languages={formattedLanguages}>
          <CountriesProvider countries={formattedCountries}>
            <GenresProvider genres={formattedGenres}>
              <html lang="en">
                <body className={`max-w-[1280px] m-auto w-full h-auto overflow-y-auto overflow-x-hidden ${interFont}`}>{children}</body>
              </html>
            </GenresProvider>
          </CountriesProvider>
        </LanguagesProvider>
      </PlaylistProvider>
    </ClientCountryProvider>
  )
}
