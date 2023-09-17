import { useMemo } from "react"

const useFilter = ({ data, query }) => {
    const filteredBySearch = useMemo(() => data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    ), [data, query])

    return {
        filteredBySearch
    }
}

export default useFilter