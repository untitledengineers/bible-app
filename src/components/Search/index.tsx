import { Feather } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, createRef, useCallback } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
      <TouchableOpacity
        onPress={handleNavigationToBook({ bookName: item.name })}
      >
        <Text style={styles.bookName}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [handleNavigationToBook, styles]
  )

  const renderVerse = useCallback(
    (item: Verse) => (
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

  const renderBookHeader = () => {
    if (filteredBooks?.length === 0) return null

    return (
      <View style={styles.bookHeader}>
        <Text style={styles.sectionHeader}>Livros</Text>
        <View style={styles.sectionSeparator} />
      </View>
    )
  }

  const renderVerseHeader = () => {
    if (parsedVerses?.length === 0) return null

    return (
      <View style={styles.verseHeader(filteredBooks?.length)}>
        <Text style={styles.sectionHeader}>Versos</Text>
        <View style={styles.sectionSeparator} />
      </View>
    )
  }

  const renderSectionHeader = (title: string) => {
    if (title === 'Livros') {
      return renderBookHeader()
    }

    return renderVerseHeader()
  }

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
          blurOnSubmit
          underlineColorAndroid="transparent"
          cursorColor={theme.colors.white}
        />
      </LinearGradient>

      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={92}
        getItemType={getItemType}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

export default Search
