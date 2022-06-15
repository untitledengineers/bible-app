import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import SwipeableButton from '../../components/SwipeableButton'

import bibleData from '../../data/lite_bible_ptbr.json'
import { useBackHandler } from '../../hooks'

import {
  Container,
  Button,
  Separator,
  Title,
  Content,
  Chapter,
  ChapterText
} from './styles'

export interface IBook {
  name: string
  chaptersNumber: number[]
  abbrev: string
  chapters: string[][]
}

const Home = () => {
  const navigation = useNavigation()

  useBackHandler()

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <SwipeableButton book={item}>
      <Button
        onPress={() => navigation.navigate('Book', { bookName: item.name })}
      >
        <Content>
          <Title>{item.name}</Title>

          <Chapter>
            <Entypo name="open-book" size={18} color="#999" />
            <ChapterText> {item.chaptersNumber.length} Capítulos</ChapterText>
          </Chapter>
        </Content>
      </Button>
    </SwipeableButton>
  )

  return (
    <Container>
      <FlatList
        data={bibleData as IBook[]}
        keyExtractor={book => book.name}
        renderItem={renderBookItem}
        ItemSeparatorComponent={() => <Separator />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        initialNumToRender={66}
      />
    </Container>
  )
}

export default Home
