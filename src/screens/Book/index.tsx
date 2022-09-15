import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  FlatList,
  Animated,
  ViewToken,
  useWindowDimensions,
  ListRenderItem
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import bibleData from '../../data/bible_acf.json'

import DrawerNavigation from './DrawerNavigation'

import HeaderApp from '../../components/Header'

import { useLoading } from '../../context/loading'
import { useBackHandler } from '../../hooks'

import {
  Container,
  Item,
  FirstVerseNumber,
  VerseNumber,
  Verse,
  ItemSeparator,
  ListHeader,
  ListHeaderSeparator,
  ListHeaderText,
  AnimatedHeader,
  LIST_HEADER_HEIGHT
} from './styles'

type IParams = {
  bookName: string
  initialScrollIndex?: number
}

type IBook = {
  name: string
  chapters: string[][]
  chaptersNumber: number[]
}

const HEADER_APP_MAX_HEIGHT = 40
const HEADER_APP_MIN_HEIGHT = 0

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList)

const Book = () => {
  const route = useRoute()
  const { bookName, initialScrollIndex } = route.params as IParams
  const [bookChapters, setBookChapters] = useState<string[][]>([])
  const [chaptersNumber, setChaptersNumber] = useState<number[]>([])
  const [indexViewable, setIndexViewable] = useState<number | null>(0)
  const [indexToScroll, setIndexToScroll] = useState(0)
  const listRef = useRef<FlatList>(null)
  const drawerRef = useRef<DrawerLayout>(null)
  const { isVisible, handleVisible } = useLoading()
  const window = useWindowDimensions()

  const scrollY = useRef(new Animated.Value(0)).current
  const diffClamp = Animated.diffClamp(
    scrollY,
    HEADER_APP_MIN_HEIGHT,
    HEADER_APP_MAX_HEIGHT
  )
  const translateY: Animated.AnimatedInterpolation = diffClamp.interpolate({
    inputRange: [HEADER_APP_MIN_HEIGHT, HEADER_APP_MAX_HEIGHT],
    outputRange: [HEADER_APP_MIN_HEIGHT, -HEADER_APP_MAX_HEIGHT],
    extrapolate: 'clamp'
  })
  const titleOpacity = scrollY.interpolate({
    inputRange: [
      0,
      (LIST_HEADER_HEIGHT + HEADER_APP_MAX_HEIGHT) / 2,
      LIST_HEADER_HEIGHT + HEADER_APP_MAX_HEIGHT
    ],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  const viewConfigRef = React.useRef({
    itemVisiblePercentThreshold: 5,
    minimumViewTime: 150
  })

  // This useRef is necessary to fix a bug on the flatlist.
  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    setIndexViewable(info.viewableItems[0]?.index)
  })

  const handleScrollToIndex = useCallback((index: number) => {
    drawerRef.current?.closeDrawer()

    listRef.current?.scrollToIndex({ animated: true, index })

    setIndexToScroll(index)
  }, [])

  useBackHandler()

  useEffect(() => {
    const bibles = bibleData as IBook[]

    const booksFound = bibles.filter(bible => bible.name === bookName)

    setBookChapters(booksFound[0].chapters)
    setChaptersNumber(booksFound[0].chaptersNumber)

    if (initialScrollIndex) {
      setTimeout(() => handleScrollToIndex(initialScrollIndex), 100)
    }
  }, [bookName, handleScrollToIndex, initialScrollIndex])

  useEffect(() => {
    if (indexViewable === indexToScroll && isVisible) {
      handleVisible(false)
    }
  }, [handleVisible, indexToScroll, indexViewable, isVisible])

  useEffect(() => {
    return () => {
      if (isVisible) {
        handleVisible(false)
      }
    }
  }, [handleVisible, isVisible])

  const handleOnScrollFailed = (info: {
    index: number
    averageItemLength: number
  }) => {
    if (!isVisible) {
      handleVisible(true)
    }

    listRef.current?.scrollToOffset({
      offset: info.averageItemLength * info.index
    })

    setTimeout(() => {
      listRef.current?.scrollToIndex({ index: info.index, animated: true })
    }, 100)
  }

  const renderChapterItem: ListRenderItem<string[]> = ({ item, index }) => (
    <>
      {item.map((verse, vIndex) => {
        if (vIndex === 0) {
          return (
            <Item key={`${index}-${vIndex}`}>
              <FirstVerseNumber>{index + 1}</FirstVerseNumber>

              <Verse>{verse}</Verse>
            </Item>
          )
        }

        return (
          <Item key={`${index}-${vIndex}`}>
            <Verse>
              <VerseNumber>{vIndex + 1}</VerseNumber> {verse}
            </Verse>
          </Item>
        )
      })}
    </>
  )

  const renderHeader = () => (
    <ListHeader>
      <ListHeaderSeparator />

      <ListHeaderText>{bookName}</ListHeaderText>

      <ListHeaderSeparator />
    </ListHeader>
  )

  return (
    <Container>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={40}
        edgeWidth={window.width}
        drawerPosition="right"
        drawerType="slide"
        overlayColor="transparent"
        drawerBackgroundColor="#efebe4"
        renderNavigationView={() => (
          <DrawerNavigation
            handleScroll={handleScrollToIndex}
            chaptersNumber={chaptersNumber}
          />
        )}
      >
        <AnimatedHeader
          style={{
            transform: [{ translateY }]
          }}
        >
          <HeaderApp titleOpacity={titleOpacity} title={bookName} />
        </AnimatedHeader>

        <AnimatedFlatList
          ref={listRef}
          data={bookChapters}
          keyExtractor={(chapter: string[]) => chapter[1].toString()}
          renderItem={renderChapterItem}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={() => <ItemSeparator />}
          initialNumToRender={2}
          scrollEventThrottle={16}
          nestedScrollEnabled
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: HEADER_APP_MAX_HEIGHT
          }}
          onScrollToIndexFailed={handleOnScrollFailed}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          windowSize={50}
        />
      </DrawerLayout>
    </Container>
  )
}

export default Book
