import { FlashList, ListRenderItem } from '@shopify/flash-list'
import Constants from 'expo-constants'
import React, { useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { ScrollView, Swipeable } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
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
  const currentSwipeableOpened = useRef<Swipeable>(null)
  const { styles, theme } = useStyles(stylesheet)

  const handleSwipeableOpen = useCallback((swipeableRef: Swipeable) => {
    if (currentSwipeableOpened.current === swipeableRef) return

    currentSwipeableOpened.current?.close()
    currentSwipeableOpened.current = swipeableRef
  }, [])

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <BookItem book={item} handleSwipeableOpen={handleSwipeableOpen} />
  )

  useEffect(() => {
    // Necessary because of a bug in text color in FlashList when changing theme
    currentSwipeableOpened.current?.close()
  }, [theme])

  return (
    <View style={styles.container}>
      <SidebarMenu />
      <FlashList
        data={bibleData as IBook[]}
        keyExtractor={book => book.name}
        renderItem={renderBookItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ paddingTop: Constants.statusBarHeight }}
        onScroll={() => currentSwipeableOpened.current?.close()}
        renderScrollComponent={ScrollView}
      />
    </View>
  )
}

export default Home
