import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import { TMDB_IMAGE_PATH } from "@/constants"
import fallbackPlaceholderUser from "@/public/fallbackPlaceholderUser.jpg"
import useImage from "@/hooks/useImage/useImage"
import Skeleton from "react-loading-skeleton"

interface MovieSelectionPaneCastCrewDetailsItemTypes {
  id: number
  name: string
  profilePath: string
  character?: string
}

const MovieSelectionPaneCastCrewDetailsItem: FC<MovieSelectionPaneCastCrewDetailsItemTypes> = ({ id, name, profilePath, character }) => {
  const { hasImageLoaded, setHasImageLoaded } = useImage()

  return (
    <Link key={id} href={character ? `/actor/${id}` : `/director/${id}`}>
      <div className="mb-3 text-sm hover:bg-[gray] hover:bg-opacity-70 rounded-xl pr-2 py-1">
        <div className="grid gap-1">
          <div className="flex justify-between items-center h-[45px] gap-x-4 pl-2 rounded transition duration-200 ease-in-out">
            <div className="flex items-center relative">
              <div className="relative items-center justify-center h-[45px] w-[30px]">
                {!hasImageLoaded && (
                  <Skeleton height={45} width={30} enableAnimation className="absolute left-0 !rounded-xl" highlightColor="#d6d6d6" />
                )}
                <Image
                  unoptimized
                  className={`relative rounded-xl ${hasImageLoaded ? "opacity-100" : "opacity-0"} select-none`}
                  onLoadingComplete={() => setHasImageLoaded(true)}
                  src={profilePath ? `${TMDB_IMAGE_PATH}${profilePath}` : fallbackPlaceholderUser}
                  alt={name}
                  width={30}
                  height={30}
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
