import React from 'react'

import Drawer from './components/Drawer'
import Header from './components/Header'
import List from './components/List'
import { Container } from './styles'
import { useBookController } from './useBookController'

import Loading from '@/components/Loading'

const Book = () => {
  const {
    onViewableItemsChanged,
    handleScrollToIndex,
    translateY,
    titleOpacity,
    listRef,
    handleOnScrollFailed,
    scrollY,
    drawerRef,
    isLoading
  } = useBookController()

  return (
    <Container>
      <Drawer drawerRef={drawerRef} handleScrollToIndex={handleScrollToIndex}>
        <Header titleOpacity={titleOpacity} translateY={translateY} />

        <List
          listRef={listRef}
          onViewableItemsChanged={onViewableItemsChanged}
          scrollY={scrollY}
          handleOnScrollFailed={handleOnScrollFailed}
        />
      </Drawer>

      {isLoading && <Loading />}
    </Container>
  )
}

export default Book
