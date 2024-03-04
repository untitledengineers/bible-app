import { FlashList, ListRenderItem } from '@shopify/flash-list'
import Constants from 'expo-constants'
import React, { useCallback, useRef } from 'react'
import { ScrollView, Swipeable } from 'react-native-gesture-handler'

import { Container, Separator } from './styles'
import BookItem from '../../components/BookItem'
import SidebarMenu from '../../components/SidebarMenu'
import bibleData from '../../data/lite_bible_acf.json'
import { useBackHandler } from '../../hooks'

export interface IBook {
  name: string
  chaptersNumber: number[]
  abbrev: string
  chapters: string[][]
}

const Home = () => {
  const currentSwipeableOpened = useRef<Swipeable>()
  useBackHandler()

  const handleSwipeableOpen = useCallback(
    (swipeableRef: Swipeable | undefined) => {
      if (currentSwipeableOpened.current === swipeableRef) return

      currentSwipeableOpened.current?.close()
      currentSwipeableOpened.current = swipeableRef
    },
    []
  )

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <BookItem book={item} handleSwipeableOpen={handleSwipeableOpen} />
  )

  return (
    <Container>
      <SidebarMenu />
      <FlashList
        data={bibleData as IBook[]}
        estimatedItemSize={84}
        keyExtractor={book => book.name}
        renderItem={renderBookItem}
        ItemSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ paddingTop: Constants.statusBarHeight }}
        onScroll={() => currentSwipeableOpened.current?.close()}
        renderScrollComponent={ScrollView}
      />
    </Container>
  )
}

export default Home
