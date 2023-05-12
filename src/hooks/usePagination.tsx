import { useState } from 'react'

interface PaginationState {
  currentPage: number
  pageSize: number
  total: number
}

interface PaginationActions {
  nextPage: () => void
  prevPage: () => void
  jumpToPage: (page: number) => void
}

export default function usePagination(
  initialState: PaginationState
): [PaginationState, PaginationActions] {
  const [state, setState] = useState(initialState)

  const nextPage = () => {
    setState((prevState) => {
      const currentPage = prevState.currentPage + 1
      return { ...prevState, currentPage }
    })
  }

  const prevPage = () => {
    setState((prevState) => {
      const currentPage = prevState.currentPage - 1
      return { ...prevState, currentPage }
    })
  }

  const jumpToPage = (page: number) => {
    setState((prevState) => {
      return { ...prevState, currentPage: page }
    })
  }

  return [state, { nextPage, prevPage, jumpToPage }]
}
