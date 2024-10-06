import useSWR from "swr"
import { SWR_FETCHER } from "@/constants"

// NOTE: For cached calls to route handler
const useCountries = (skipCondition: boolean) => {
  const { data, error, isLoading } = useSWR(!skipCondition ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/countries` : null, SWR_FETCHER)

  return {
    data,
    error,
    isLoading
  }
}

export default useCountries
