import React from 'react'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import BookItem from '../../components/BookItem'

import bibleData from '../../data/lite_bible_acf.json'
import { useBackHandler } from '../../hooks'

import { Container, Separator } from './styles'

export interface IBook {
  name: string
  chaptersNumber: number[]
  abbrev: string
  chapters: string[][]
}

const Home = () => {
  useBackHandler()

  const renderBookItem: ListRenderItem<IBook> = ({ item }) => (
    <BookItem book={item} />
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
        initialNumToRender={15}
      />
    </Container>
  )
}

export default Home
