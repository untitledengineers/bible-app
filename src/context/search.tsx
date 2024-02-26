import React, { createContext, useContext, useState, useCallback } from 'react'

import ModalView from '../components/ModalView'
import Search from '../components/Search'

interface SearchContextData {
  handleOpen(): void
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData)

export const SearchProvider = ({
  children
}: React.PropsWithChildren<unknown>): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOpen = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return (
    <SearchContext.Provider value={{ handleOpen }}>
      {children}

      <ModalView visible={isModalVisible}>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          closeModal={handleClose}
        />
      </ModalView>
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextData {
  const context = useContext(SearchContext)

  return context
}
