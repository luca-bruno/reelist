import { FC, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TMDB_IMAGE_PATH } from "@/constants"
import fallbackPlaceholderUser from "@/public/fallbackPlaceholderUser.jpg"
import useImage from "@/hooks/useImage/useImage"
import Skeleton from "react-loading-skeleton"
import { transitionStyles } from "@/helpers"
import { usePathname } from "next/navigation"

interface MovieSelectionPaneCastCrewDetailsItemTypes {
  id: number
  name: string
  profilePath: string
  character?: string
}

const MovieSelectionPaneCastCrewDetailsItem: FC<MovieSelectionPaneCastCrewDetailsItemTypes> = ({ id, name, profilePath, character }) => {
  const { hasImageLoaded, setHasImageLoaded } = useImage()
  const pathname = usePathname()

  const [queryParams, setQueryParams] = useState<string>()

  useEffect(() => {
    const currentQueryParams = new URLSearchParams(window.location.search)

    if (currentQueryParams) {
      setQueryParams(currentQueryParams.toString())
    }
  }, [])

  return (
    <Link key={id} href={`${pathname}?${queryParams}&name=${id}`}>
      <div className={`text-sm hover:bg-[gray] hover:bg-opacity-70 rounded-xl pr-2 py-1 ${transitionStyles}`}>
        <div className="grid gap-1">
          <div className="flex justify-between items-center h-[45px] gap-x-4 pl-2 rounded">
            <div className="flex items-center relative">
              <div className="relative items-center justify-center h-[45px] w-[30px]">
                {!hasImageLoaded && (
                  <Skeleton height={45} width={30} enableAnimation className="absolute left-0 !rounded-xl" highlightColor="#d6d6d6" />
                )}
                <Image
                  unoptimized
                  className={`relative w-[30px] h-[45px] rounded-xl ${hasImageLoaded ? "opacity-100" : "opacity-0"} select-none`}
                  onLoad={() => setHasImageLoaded(true)}
                  src={profilePath ? `${TMDB_IMAGE_PATH}${profilePath}` : fallbackPlaceholderUser}
                  alt={name}
                  width={30}
                  height={45}
                  draggable={false}
                />
              </div>
              <p className="font-semibold pl-2">{name}</p>
            </div>
            {character && (
              <div>
                <p className="text-end">{character}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieSelectionPaneCastCrewDetailsItem
