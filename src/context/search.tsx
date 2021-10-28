/* eslint-disable no-shadow */
import React, { createContext, useContext, useRef, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Modalize } from 'react-native-modalize'

interface SearchContextData {
  handleOpen(): void
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData)

export const SearchProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const modalizeRef = useRef<Modalize>(null)

  const handleOpen = useCallback(() => {
    modalizeRef.current?.open()
  }, [])

  return (
    <SearchContext.Provider value={{ handleOpen }}>
      {children}

      <Modalize
        ref={modalizeRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0]
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Search screen</Text>
        </View>
      </Modalize>
    </SearchContext.Provider>
  )
}

// Hook próprio
export function useSearch() {
  const context = useContext(SearchContext)

  return context
}
