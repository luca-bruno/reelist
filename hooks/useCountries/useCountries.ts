import useSWR from "swr"
import { SWR_FETCHER } from "@/constants"

// TODO: undo this bc not to be fetched on client
// NOTE: For cached calls to route handler
const useCountries = (skipCondition: boolean) => {
  const { data, error, isLoading } = useSWR(!skipCondition ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/countries` : null, SWR_FETCHER, {
    revalidateOnMount: true,
    revalidateOnFocus: false
  })

  return {
    data,
    error,
    isLoading
  }
}

export default useCountries
