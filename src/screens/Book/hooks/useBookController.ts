import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import {
  FlatList,
  Animated,
  ViewToken,
  useWindowDimensions
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import bibleData from '../../../data/bible_acf.json'

import { useLoading } from '../../../context/loading'
import { useBackHandler } from '../../../hooks'

import { LIST_HEADER_HEIGHT } from '../styles'

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

export function useBookController() {
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

  const handleOnScrollFailed = useCallback(
    (info: { index: number; averageItemLength: number }) => {
      if (!isVisible) {
        handleVisible(true)
      }

      listRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index
      })

      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: info.index, animated: true })
      }, 100)
    },
    [handleVisible, isVisible]
  )

  const values = useMemo(
    () => ({
      drawerRef,
      onViewRef,
      viewConfigRef,
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
      HEADER_APP_MAX_HEIGHT
    }),
    [
      bookChapters,
      bookName,
      chaptersNumber,
      handleOnScrollFailed,
      handleScrollToIndex,
      scrollY,
      titleOpacity,
      translateY,
      window
    ]
  )

  return values
}