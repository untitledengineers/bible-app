import { useRoute } from '@react-navigation/native'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Animated, ViewToken, SectionList } from 'react-native'
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import { LIST_HEADER_HEIGHT } from './components/ListHeader/styles'
import { useSearch } from '../../context/search'
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

export type BookChapter = {
  title: string
  data: string[]
}

export const HEADER_APP_MAX_HEIGHT = HEADER_HEIGHT
export const HEADER_APP_MIN_HEIGHT = 0

export const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 5,
  minimumViewTime: 150
}

export const useBookController = () => {
  const route = useRoute()
  const { bookName, initialScrollIndex } = route.params as IParams
  const [bookChapters, setBookChapters] = useState<BookChapter[]>([])
  const [chaptersNumber, setChaptersNumber] = useState<number[]>([])
  const [indexToScroll, setIndexToScroll] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<SectionList>(null)
  const drawerRef = useRef<DrawerLayout>(null)
  const { handleOpen } = useSearch()
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

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

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[] }) => {
      // eslint-disable-next-line eqeqeq
      if (info.viewableItems[0]?.section?.title == indexToScroll + 1) {
        setIsLoading(false)
      }
    },
    [indexToScroll]
  )

  const handleScrollToIndex = useCallback((sectionIndex: number) => {
    if (drawerRef.current?.state.drawerOpened) {
      drawerRef.current?.closeDrawer()
    }

    setIndexToScroll(sectionIndex)

    timeout.current = setTimeout(() => {
      listRef.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true
      })
    }, 100)
  }, [])

  const handleOnScrollFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      if (!isLoading) {
        setIsLoading(true)
      }

      const offset = info.averageItemLength * info.index
      listRef.current
        ?.getScrollResponder()
        ?.scrollTo({ x: 0, y: offset, animated: true })

      if (indexToScroll) {
        timeout.current = setTimeout(() => {
          listRef.current?.scrollToLocation({
            sectionIndex: indexToScroll,
            itemIndex: 0,
            animated: true
          })
        }, 100)
      }
    },
    [indexToScroll, isLoading]
  )

  const handleDoubleTap = useCallback(
    (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        handleOpen()
      }
    },
    [handleOpen]
  )

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    const bibles = bibleData as IBook[]
    const bookFound = bibles.find(bible => bible.name === bookName)

    if (!bookFound) return

    const sections = bookFound.chapters.map((chapter, index) => ({
      title: `${index + 1}`,
      data: chapter
    }))

    setBookChapters(sections)
    setChaptersNumber(bookFound.chaptersNumber)

    if (initialScrollIndex) {
      timeout.current = setTimeout(
        () => handleScrollToIndex(initialScrollIndex),
        100
      )
    }
  }, [bookName, handleScrollToIndex, initialScrollIndex])

  const values = useMemo(
    () => ({
      drawerRef,
      onViewableItemsChanged,
      bookName,
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
      isLoading
    }),
    [
      onViewableItemsChanged,
      bookName,
      handleScrollToIndex,
      chaptersNumber,
      translateY,
      titleOpacity,
      bookChapters,
      handleOnScrollFailed,
      scrollY,
      handleDoubleTap,
      isLoading
    ]
  )

  return values
}
