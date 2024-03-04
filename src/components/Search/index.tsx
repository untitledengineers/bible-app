import { FlashList } from '@shopify/flash-list'
import React, { useEffect, createRef, useCallback } from 'react'
import { TextInput } from 'react-native'
import { createFilter } from 'react-native-search-filter'

import * as S from './styles'
import bibleData from '../../data/bible_acf.json'
import { IBook } from '../../screens/Home'
import { navigate } from '../../utils/navigation'

interface Verse {
  bookName: string
  bookVerseText: string
  bookVerseNumber: number
  bookChapterNumber: number
}

interface Props {
  searchTerm: string
  setSearchTerm: (term: string) => void
  closeModal: () => void
}

const KEYS_TO_FILTER_BOOKS = ['name']
const KEYS_TO_FILTERS_VERSES = ['chapters']

function filterTerms(searchTerm: string, keys: string[]) {
  return (bibleData as IBook[]).filter(createFilter(searchTerm, keys))
}

function Search({ closeModal, searchTerm, setSearchTerm }: Props): JSX.Element {
  const inputRef = createRef<TextInput>()

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

  const data = React.useMemo(() => {
    return ['Livros', ...filteredBooks, 'Versos', ...parsedVerses]
  }, [filteredBooks, parsedVerses])

  const getItemType = (item: Verse | IBook | string) => {
    return typeof item === 'string' ? 'sectionHeader' : 'row'
  }

  const handleNavigationToBook = useCallback(
    (item: { bookName: string; chapterNumber?: number }) => {
      return () => {
        navigate('Book', {
          bookName: item.bookName,
          initialScrollIndex: item.chapterNumber ? item.chapterNumber - 1 : 0
        })

        closeModal()
      }
    },
    [closeModal]
  )

  const renderBook = useCallback(
    (item: IBook) => (
      <S.BookNameWrapper
        onPress={handleNavigationToBook({ bookName: item.name })}
      >
        <S.BookName>{item.name}</S.BookName>
      </S.BookNameWrapper>
    ),
    [handleNavigationToBook]
  )

  const renderVerse = useCallback(
    (item: Verse) => (
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
    ),
    [handleNavigationToBook]
  )

  const renderSectionHeader = (title: string) => (
    <S.SectionWrapper>
      <S.SectionHeader>{title}</S.SectionHeader>
      <S.SectionSeparator />
    </S.SectionWrapper>
  )

  const renderItem = ({ item }: { item: IBook | Verse | string }) => {
    // Section header
    if (typeof item === 'string') {
      return renderSectionHeader(item)
    }

    // Book item
    if ('name' in item) {
      return renderBook(item)
    }

    // Verse item
    return renderVerse(item)
  }

  useEffect(() => {
    if (!searchTerm) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

  return (
    <S.Container>
      <S.Header>
        <S.CloseButton onPress={closeModal} />

        <S.Input
          ref={inputRef}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </S.Header>

      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={56}
        getItemType={getItemType}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        keyboardShouldPersistTaps="handled"
      />
    </S.Container>
  )
}

export default Search
