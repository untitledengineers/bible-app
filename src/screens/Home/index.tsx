import { FlashList, ListRenderItem } from '@shopify/flash-list'
import React, { useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles'

import { styles } from './styles'
import BookItem from '../../components/BookItem'
import SidebarMenu from '../../components/SidebarMenu'
import bibleData from '../../data/lite_bible_acf.json'

export interface IBook {
  name: string
  chaptersNumber: number[]
  abbrev: string
  chapters: string[][]
}

const Home = () => {
  const currentSwipeableOpened = useRef<SwipeableMethods>(null)
  const { theme } = useUnistyles()

  const handleSwipeableOpen = useCallback((swipeableRef: SwipeableMethods) => {
    if (currentSwipeableOpened.current === swipeableRef) return

    currentSwipeableOpened.current?.close()
    currentSwipeableOpened.current = swipeableRef
  }, [])

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <BookItem book={item} handleSwipeableOpen={handleSwipeableOpen} />
  )

  useEffect(() => {
    // necessary because of a bug in text color in FlashList when changing theme
    currentSwipeableOpened.current?.close()
  }, [theme.colors.background])

  return (
    <View style={styles.container}>
      <SidebarMenu />
      <FlashList
        // key reason: book item is not re-rendered correctly when the theme is changed
        key={UnistylesRuntime.themeName}
        data={bibleData as IBook[]}
        keyExtractor={book => book.name}
        renderItem={renderBookItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.listContent}
        onScroll={() => currentSwipeableOpened.current?.close()}
        renderScrollComponent={ScrollView}
      />
    </View>
  )
}

export default Home
