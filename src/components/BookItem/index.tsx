import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Animated, ListRenderItem, useWindowDimensions } from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

import { IBook } from '../../screens/Home'

import * as S from './styles'

type BookItemProps = {
  book: IBook
}

const BookItem = ({ book }: BookItemProps) => {
  const [rightActionsIsOpen, setRightActionsIsOpen] = useState(false)
  const window = useWindowDimensions()
  const navigation = useNavigation()

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
              horizontal
              nestedScrollEnabled
              data={book.chaptersNumber}
              keyExtractor={item => item.toString()}
              renderItem={renderChapterItem}
              style={{
                marginLeft: 40,
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }}
              contentContainerStyle={{
                paddingVertical: 4
              }}
            />
          )}
        </S.Container>
      )
    },
    [book.chaptersNumber, renderChapterItem, rightActionsIsOpen, window.width]
  )

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onBegan={() => handleActionVisibility(true)}
      onSwipeableClose={() => handleActionVisibility(false)}
    >
      <S.Button onPress={handleBookNavigation}>
        <S.Content>
          <S.Title>{book.name}</S.Title>

          <S.Chapter>
            <Entypo name="open-book" size={18} color="#999" />
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
