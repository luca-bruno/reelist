import { useState } from "react"

const useImage = () => {
    const [hasImageLoaded, setHasImageLoaded] = useState(false)
    const [hasReturnedError, setHasReturnedError] = useState(false)
    const [hasBackgroundImageReturnedError, setHasBackgroundImageReturnedError] = useState(false)

    return {
        hasImageLoaded,
        setHasImageLoaded,
        hasReturnedError,
        setHasReturnedError,
        hasBackgroundImageReturnedError,
        setHasBackgroundImageReturnedError
    }
}

export default useImage