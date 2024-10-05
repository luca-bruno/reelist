import useSWR from "swr"
import { SWR_FETCHER } from "@/constants"

// NOTE: For cached calls to route handler
const useCountries = () => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/countries`, SWR_FETCHER)

  return {
    data,
    error,
    isLoading
  }
}

export default useCountries
