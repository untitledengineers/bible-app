import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import React, { memo, useCallback, useRef, useState } from 'react'
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native'
import { RectButton, ScrollView, Swipeable } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { IBook } from '../../screens/Home'

type BookItemProps = {
  book: IBook
  handleSwipeableOpen: (swipeableRef: Swipeable | undefined) => void
}

const INITIAL_ACTIVE_OFFSET_X = [-10, 0]
const FINAL_ACTIVE_OFFSET_X = [-10, 10]

const BookItem = ({ book, handleSwipeableOpen }: BookItemProps) => {
  const [rightActionsIsOpen, setRightActionsIsOpen] = useState(false)
  const [activeOffsetX, setActiveOffsetX] = useState(INITIAL_ACTIVE_OFFSET_X)
  const swipeableRef = useRef<Swipeable>(null)
  const window = useWindowDimensions()
  const navigation = useNavigation()
  const { styles, theme } = useStyles(stylesheet)

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

  const onSwipeableWillOpen = useCallback(() => {
    if (!swipeableRef.current) return

    handleSwipeableOpen(swipeableRef.current)
  }, [handleSwipeableOpen])

  const renderChapterItem: ListRenderItem<number> = useCallback(
    ({ index }) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleChapterNavigation(index)}
        >
          <Text style={styles.itemContent}>{index + 1}</Text>
        </TouchableOpacity>
      )
    },
    [handleChapterNavigation, styles]
  )

  const renderRightActions = useCallback(
    (progress: Animated.AnimatedInterpolation<string | number>) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [window.width, 0],
        extrapolate: 'clamp'
      })

      return (
        <Animated.View
          style={{
            ...styles.container,
            transform: [{ translateX }]
          }}
        >
          {rightActionsIsOpen && (
            <FlashList
              estimatedItemSize={62}
              horizontal
              nestedScrollEnabled
              data={book.chaptersNumber}
              keyExtractor={item => item.toString()}
              overrideProps={{
                contentContainerStyle: {
                  flexGrow: 1
                }
              }}
              renderItem={renderChapterItem}
              onScroll={handleScroll}
              renderScrollComponent={ScrollView}
            />
          )}
        </Animated.View>
      )
    },
    [
      book.chaptersNumber,
      handleScroll,
      renderChapterItem,
      rightActionsIsOpen,
      styles.container,
      window.width
    ]
  )

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onBegan={() => handleActionVisibility(true)}
      onSwipeableClose={() => handleActionVisibility(false)}
      onSwipeableWillOpen={onSwipeableWillOpen}
      activeOffsetX={activeOffsetX}
    >
      <RectButton style={styles.button} onPress={handleBookNavigation}>
        <View style={styles.content}>
          <Text style={styles.title}>{book.name}</Text>

          <View style={styles.chapter}>
            <Entypo name="open-book" size={18} color={theme.colors.border} />
            <Text style={styles.chapterText}>
              {' '}
              {book.chaptersNumber.length} Capítulos
            </Text>
          </View>
        </View>
      </RectButton>
    </Swipeable>
  )
}

export default memo(BookItem)
