const useShowcase = (payload: any, currentPage: number, itemsPerPage: number) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const totalPages = Math.ceil(payload.length / itemsPerPage)
  const currentItems = payload.slice(startIndex, endIndex)

  return {
    startIndex,
    endIndex,
    totalPages,
    currentItems
  }
}

export default useShowcase
