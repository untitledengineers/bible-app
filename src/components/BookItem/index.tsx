import { Entypo } from '@expo/vector-icons'
import React, { memo, useCallback, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable, {
  SwipeableMethods
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import { SharedValue } from 'react-native-reanimated'
import { useStyles } from 'react-native-unistyles'

import RightActions from './RightActions'
import { stylesheet } from './styles'
import { IBook } from '../../screens/Home'

import { navigate } from '@/utils/navigation'

type BookItemProps = {
  book: IBook
  handleSwipeableOpen: (swipeableRef: SwipeableMethods) => void
}

const BookItem = ({ book, handleSwipeableOpen }: BookItemProps) => {
  const [rightActionsIsOpen, setRightActionsIsOpen] = useState(false)
  const swipeableRef = useRef<SwipeableMethods>(null)
  const { styles, theme } = useStyles(stylesheet)

  const handleActionVisibility = (state: boolean) => {
    setRightActionsIsOpen(state)
  }

  const handleBookNavigation = useCallback(() => {
    navigate('Book', {
      bookName: book.name
    })
  }, [book.name])

  const onSwipeableWillOpen = useCallback(() => {
    if (!swipeableRef.current) return

    handleSwipeableOpen(swipeableRef.current)
  }, [handleSwipeableOpen])

  const renderRightActions = useCallback(
    (_: unknown, translation: SharedValue<number>) => {
      return (
        <RightActions
          translation={translation}
          chaptersNumber={book.chaptersNumber}
          rightActionsIsOpen={rightActionsIsOpen}
          bookName={book.name}
        />
      )
    },
    [book.name, book.chaptersNumber, rightActionsIsOpen]
  )

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpenStartDrag={() => handleActionVisibility(true)}
      onSwipeableClose={() => handleActionVisibility(false)}
      onSwipeableWillOpen={onSwipeableWillOpen}
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
