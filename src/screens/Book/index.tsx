import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'

import Drawer from './components/Drawer'
import Header from './components/Header'
import List from './components/List'
import { stylesheet } from './styles'
import { useBookController } from './useBookController'

import Loading from '@/components/Loading'

const Book = () => {
  const { styles } = useStyles(stylesheet)
  const {
    onViewableItemsChanged,
    handleScrollToIndex,
    translateY,
    titleOpacity,
    listRef,
    handleOnScrollFailed,
    scrollY,
    drawerRef,
    isLoading,
    bookName,
    bookChapters,
    handleDoubleTap,
    chaptersNumber
  } = useBookController()

  return (
    <View style={styles.container}>
      <Drawer
        drawerRef={drawerRef}
        chaptersNumber={chaptersNumber}
        handleScrollToIndex={handleScrollToIndex}
      >
        <Header
          bookName={bookName}
          titleOpacity={titleOpacity}
          translateY={translateY}
        />

        <List
          listRef={listRef}
          onViewableItemsChanged={onViewableItemsChanged}
          scrollY={scrollY}
          handleOnScrollFailed={handleOnScrollFailed}
          bookName={bookName}
          bookChapters={bookChapters}
          handleDoubleTap={handleDoubleTap}
        />
      </Drawer>

      {isLoading && <Loading />}
    </View>
  )
}

export default Book
