import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, createRef, useCallback } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { createFilter } from 'react-native-search-filter'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
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
  const { styles, theme } = useStyles(stylesheet)

  useEffect(() => {
    if (!searchTerm) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

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

  const renderBook: SectionListRenderItem<IBook> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={handleNavigationToBook({ bookName: item.name })}
      >
        <Text style={styles.bookName}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [handleNavigationToBook, styles]
  )

  const renderVerse: SectionListRenderItem<Verse> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.verseWrapper}
        onPress={handleNavigationToBook({
          bookName: item.bookName,
          chapterNumber: item.bookChapterNumber
        })}
      >
        <Text style={styles.verse} numberOfLines={2}>
          {item.bookVerseText}
        </Text>
        <Text style={styles.verseLocation}>
          {item.bookName} {item.bookChapterNumber}:{item.bookVerseNumber}
        </Text>
      </TouchableOpacity>
    ),
    [handleNavigationToBook, styles]
  )

  const renderSectionHeader = (info: {
    section: SectionListData<IBook | Verse>
  }) => (
    <>
      {info.section.data.length > 0 && (
        <View>
          <Text style={styles.sectionHeader}>{info.section.title}</Text>
          <View style={styles.sectionSeparator} />
        </View>
      )}
    </>
  )

  const renderSectionFooter = () => <View style={styles.sectionFooter} />

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
  }, [filteredBooks, parsedVerses, renderBook, renderVerse])

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.header} colors={theme.colors.gradient}>
        <Feather
          name="x"
          size={24}
          color={theme.colors.white}
          style={styles.closeIcon}
          onPress={closeModal}
        />

        <TextInput
          style={styles.input}
          ref={inputRef}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Digite uma palavra-chave"
          returnKeyType="search"
          onSubmitEditing={closeModal}
          blurOnSubmit
          underlineColorAndroid="transparent"
          cursorColor={theme.colors.white}
        />
      </LinearGradient>

      <SectionList
        sections={sections as any}
        style={{ marginTop: 120 }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

export default Search
