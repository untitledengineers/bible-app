import React from 'react'

import Drawer from './components/Drawer'
import Header from './components/Header'
import List from './components/List'
import { Container } from './styles'
import { useBookController } from './useBookController'

const Book = () => {
  const {
    onViewRef,
    viewConfigRef,
    handleScrollToIndex,
    translateY,
    titleOpacity,
    listRef,
    handleOnScrollFailed,
    scrollY,
    drawerRef
  } = useBookController()

  return (
    <Container>
      <Drawer drawerRef={drawerRef} handleScrollToIndex={handleScrollToIndex}>
        <Header titleOpacity={titleOpacity} translateY={translateY} />

        <List
          listRef={listRef}
          onViewRef={onViewRef}
          viewConfigRef={viewConfigRef}
          scrollY={scrollY}
          handleOnScrollFailed={handleOnScrollFailed}
        />
      </Drawer>
    </Container>
  )
}

export default Book
