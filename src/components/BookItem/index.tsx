import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import {
  Animated,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions
} from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'

import * as S from './styles'
import { useTheme } from '../../context/theme'
import { IBook } from '../../screens/Home'

type BookItemProps = {
  book: IBook
}

const INITIAL_ACTIVE_OFFSET_X = [-10, 0]
const FINAL_ACTIVE_OFFSET_X = [-10, 10]

const BookItem = ({ book }: BookItemProps) => {
  const [rightActionsIsOpen, setRightActionsIsOpen] = useState(false)
  const [activeOffsetX, setActiveOffsetX] = useState(INITIAL_ACTIVE_OFFSET_X)
  const flatListRef = useRef<FlatList<number>>(null)
  const window = useWindowDimensions()
  const navigation = useNavigation()
  const { theme } = useTheme()

  const handleActionVisibility = (state: boolean) => {
    setRightActionsIsOpen(state)
  }

  const handleBookNavigation = useCallback(() => {
    navigation.navigate('Book', {
      bookName: book.name
    })
  }, [book.name, navigation])

  const handleChapterNavigation = useCallback(
    (index: number) => {
      navigation.navigate('Book', {
        bookName: book.name,
        initialScrollIndex: index
      })
    },
    [book.name, navigation]
  )

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x

      if (offsetX < 10) {
        setActiveOffsetX(INITIAL_ACTIVE_OFFSET_X)
      } else if (activeOffsetX[1] === 0) {
        setActiveOffsetX(FINAL_ACTIVE_OFFSET_X)
      }
    },
    [activeOffsetX, setActiveOffsetX]
  )

  const renderChapterItem: ListRenderItem<number> = useCallback(
    ({ index }) => {
      return (
        <S.Item key={index} onPress={() => handleChapterNavigation(index)}>
          <S.ItemContent>{index + 1}</S.ItemContent>
        </S.Item>
      )
    },
    [handleChapterNavigation]
  )

  const renderRightActions = useCallback(
    (progress: Animated.AnimatedInterpolation<string | number>) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [window.width, 0],
        extrapolate: 'clamp'
      })

      return (
        <S.Container
          style={{
            transform: [{ translateX }]
          }}
        >
          {rightActionsIsOpen && (
            <FlatList
              ref={flatListRef}
              horizontal
              nestedScrollEnabled
              data={book.chaptersNumber}
              keyExtractor={item => item.toString()}
              renderItem={renderChapterItem}
              style={{
                backgroundColor: theme.colors.overlay10
              }}
              contentContainerStyle={{
                paddingVertical: 4
              }}
              onScroll={handleScroll}
            />
          )}
        </S.Container>
      )
    },
    [
      book.chaptersNumber,
      handleScroll,
      renderChapterItem,
      rightActionsIsOpen,
      theme.colors.overlay10,
      window.width
    ]
  )

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onBegan={() => handleActionVisibility(true)}
      onSwipeableClose={() => handleActionVisibility(false)}
      activeOffsetX={activeOffsetX}
    >
      <S.Button onPress={handleBookNavigation}>
        <S.Content>
          <S.Title>{book.name}</S.Title>

          <S.Chapter>
            <Entypo name="open-book" size={18} color={theme.colors.border} />
            <S.ChapterText>
              {' '}
              {book.chaptersNumber.length} Capítulos
            </S.ChapterText>
          </S.Chapter>
        </S.Content>
      </S.Button>
    </Swipeable>
  )
}

export default BookItem
