import useSWR from "swr"
import { SWR_FETCHER } from "@/constants"

// NOTE: For cached calls to route handler
const useLocale = (skipCondition: boolean) => {
  const { data, error, isLoading } = useSWR(!skipCondition ? `https://geolocation-db.com/json/` : null, SWR_FETCHER, {
    revalidateOnMount: true,
    revalidateOnFocus: false
  })

  return {
    data,
    error,
    isLoading
  }
}

export default useLocale
