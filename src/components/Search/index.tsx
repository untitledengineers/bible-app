import React from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItem
} from 'react-native'
import { createFilter } from 'react-native-search-filter'

import bibleData from '../../data/bible_ptbr.json'
import { IBook } from '../../screens/Home'
import { navigate } from '../../utils/navigation'

import * as S from './styles'

interface Verse {
  bookName: string
  bookVerseText: string
  bookVerseNumber: number
  bookChapterNumber: number
}

interface Props {
  closeModal: () => void
}

const KEYS_TO_FILTER_BOOKS = ['name']
const KEYS_TO_FILTERS_VERSES = ['chapters']

function filterTerms(searchTerm: string, keys: string[]) {
  return (bibleData as IBook[]).filter(createFilter(searchTerm, keys))
}

function Search({ closeModal }: Props): JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredBooks = React.useMemo(() => {
    if (searchTerm === '') return []

    return filterTerms(searchTerm, KEYS_TO_FILTER_BOOKS)
  }, [searchTerm])

  const filteredVerses = React.useMemo(() => {
    if (searchTerm === '') return []

    return filterTerms(searchTerm, KEYS_TO_FILTERS_VERSES)
  }, [searchTerm])

  const parsedVerses = React.useMemo(
    () => {
      const parsedData: Verse[] = []

      filteredVerses.map(book =>
        book.chapters.map((chapter, chapterIndex) =>
          chapter.map((verse, verseIndex) => {
            if (verse.toLowerCase().includes(searchTerm.toLowerCase())) {
              parsedData.push({
                bookName: book.name,
                bookVerseText: verse,
                bookVerseNumber: verseIndex + 1,
                bookChapterNumber: chapterIndex + 1
              })
            }

            return verse
          })
        )
      )

      return parsedData
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredVerses]
  )

  const handleNavigationToBook = (item: {
    bookName: string
    chapterNumber?: number
  }) => {
    return () => {
      navigate('Book', {
        bookName: item.bookName,
        initialScrollIndex: item.chapterNumber ? item.chapterNumber - 1 : 0
      })

      closeModal()
    }
  }

  const renderBook: SectionListRenderItem<IBook> = ({ item }) => (
    <S.BookNameWrapper
      onPress={handleNavigationToBook({ bookName: item.name })}
    >
      <S.BookName>{item.name}</S.BookName>
    </S.BookNameWrapper>
  )

  const renderVerse: SectionListRenderItem<Verse> = ({ item }) => (
    <S.VerseWrapper
      onPress={handleNavigationToBook({
        bookName: item.bookName,
        chapterNumber: item.bookChapterNumber
      })}
    >
      <S.Verse>{item.bookVerseText}</S.Verse>
      <S.VerseLocation>
        {item.bookName} {item.bookChapterNumber}:{item.bookVerseNumber}
      </S.VerseLocation>
    </S.VerseWrapper>
  )

  const renderSectionHeader = (info: {
    section: SectionListData<IBook | Verse>
  }) => (
    <>
      {info.section.data.length > 0 && (
        <S.SectionWrapper>
          <S.SectionHeader>{info.section.title}</S.SectionHeader>
          <S.SectionSeparator />
        </S.SectionWrapper>
      )}
    </>
  )

  const renderSectionFooter = () => <S.SectionFooter />

  const sections = React.useMemo(() => {
    return [
      {
        title: 'Livros',
        data: filteredBooks,
        renderItem: renderBook,
        keyExtractor: (item: IBook) => item.name
      },
      {
        title: 'Versos',
        data: parsedVerses,
        renderItem: renderVerse,
        keyExtractor: (item: Verse) =>
          item.bookChapterNumber + item.bookVerseNumber + item.bookVerseText
      }
    ]
  }, [filteredBooks, parsedVerses])

  return (
    <S.Container>
      <S.Header>
        <S.CloseButton onPress={closeModal} />

        <S.Input onChangeText={setSearchTerm} />
      </S.Header>

      <SectionList
        sections={sections as any}
        style={{ marginTop: 120 }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        keyboardShouldPersistTaps="handled"
      />
    </S.Container>
  )
}

export default Search
