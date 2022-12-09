import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Animated, useWindowDimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

import { IBook } from '../../screens/Home'

import * as S from './styles'

type BookItemProps = {
  book: IBook
}

const BookItem = ({ book }: BookItemProps) => {
  const window = useWindowDimensions()
  const navigation = useNavigation()

  const handleNavigate = (index: number) => {
    navigation.navigate('Book', {
      bookName: book.name,
      initialScrollIndex: index
    })
  }

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
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
        <S.List horizontal nestedScrollEnabled>
          {book.chaptersNumber.map((_, index) => (
            <S.Item key={index} onPress={() => handleNavigate(index)}>
              <S.ItemContent>{index + 1}</S.ItemContent>
            </S.Item>
          ))}
        </S.List>
      </S.Container>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <S.Button
        onPress={() => navigation.navigate('Book', { bookName: book.name })}
      >
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
