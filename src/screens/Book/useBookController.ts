import { useRoute } from '@react-navigation/native'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import {
  FlatList,
  Animated,
  ViewToken,
  useWindowDimensions
} from 'react-native'
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import { LIST_HEADER_HEIGHT } from './components/ListHeader/styles'
import { useSearch } from '../../context/search'
import { useTheme } from '../../context/theme'
import bibleData from '../../data/bible_acf.json'

import { HEADER_HEIGHT } from '@/components/Header/styles'

type IParams = {
  bookName: string
  initialScrollIndex?: number
}

type IBook = {
  name: string
  chapters: string[][]
  chaptersNumber: number[]
}

const HEADER_APP_MAX_HEIGHT = HEADER_HEIGHT
const HEADER_APP_MIN_HEIGHT = 0

export const useBookController = () => {
  const route = useRoute()
  const { bookName, initialScrollIndex } = route.params as IParams
  const [bookChapters, setBookChapters] = useState<string[][]>([])
  const [chaptersNumber, setChaptersNumber] = useState<number[]>([])
  const [indexToScroll, setIndexToScroll] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<FlatList>(null)
  const drawerRef = useRef<DrawerLayout>(null)
  const window = useWindowDimensions()
  const { handleOpen } = useSearch()
  const { theme } = useTheme()

  const scrollY = useRef(new Animated.Value(0)).current
  const diffClamp = Animated.diffClamp(
    scrollY,
    HEADER_APP_MIN_HEIGHT,
    HEADER_APP_MAX_HEIGHT
  )
  const translateY: Animated.AnimatedInterpolation<string | number> =
    diffClamp.interpolate({
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

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 5,
      minimumViewTime: 150
    }),
    []
  )

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[] }) => {
      if (info.viewableItems[0]?.index === indexToScroll) {
        setIsLoading(false)
      }
    },
    [indexToScroll]
  )

  const handleScrollToIndex = useCallback((index: number) => {
    if (drawerRef.current?.state.drawerOpened) {
      drawerRef.current?.closeDrawer()
    }

    listRef.current?.scrollToIndex({ animated: true, index })

    setIndexToScroll(index)
  }, [])

  const handleDoubleTap = useCallback(
    (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        handleOpen()
      }
    },
    [handleOpen]
  )

  useEffect(() => {
    const bibles = bibleData as IBook[]

    const booksFound = bibles.filter(bible => bible.name === bookName)

    setBookChapters(booksFound[0].chapters)
    setChaptersNumber(booksFound[0].chaptersNumber)

    if (initialScrollIndex) {
      setTimeout(() => handleScrollToIndex(initialScrollIndex), 100)
    }
  }, [bookName, handleScrollToIndex, initialScrollIndex])

  const handleOnScrollFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      if (!isLoading) {
        setIsLoading(true)
      }

      listRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index
      })

      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: info.index, animated: true })
      }, 100)
    },
    [isLoading]
  )

  const values = useMemo(
    () => ({
      drawerRef,
      onViewableItemsChanged,
      viewabilityConfig,
      bookName,
      window,
      handleScrollToIndex,
      chaptersNumber,
      translateY,
      titleOpacity,
      listRef,
      bookChapters,
      handleOnScrollFailed,
      scrollY,
      HEADER_APP_MAX_HEIGHT,
      handleDoubleTap,
      theme,
      isLoading
    }),
    [
      onViewableItemsChanged,
      viewabilityConfig,
      bookName,
      window,
      handleScrollToIndex,
      chaptersNumber,
      translateY,
      titleOpacity,
      bookChapters,
      handleOnScrollFailed,
      scrollY,
      handleDoubleTap,
      theme,
      isLoading
    ]
  )

  return values
}
