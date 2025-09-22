import { FlashList, ListRenderItem } from '@shopify/flash-list'
import Constants from 'expo-constants'
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
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
  const currentSwipeableOpened = useRef<SwipeableMethods>(null)
  const { styles } = useStyles(stylesheet)

  const handleSwipeableOpen = useCallback((swipeableRef: SwipeableMethods) => {
    if (currentSwipeableOpened.current === swipeableRef) return

    currentSwipeableOpened.current?.close()
    currentSwipeableOpened.current = swipeableRef
  }, [])

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <BookItem book={item} handleSwipeableOpen={handleSwipeableOpen} />
  )

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
