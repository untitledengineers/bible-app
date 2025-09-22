import { FlashList, ListRenderItem } from '@shopify/flash-list'
import React, { memo, useCallback } from 'react'
import { Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Reanimated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'

import { styles } from './styles'
import { SIDEBAR_MENU_WIDTH } from '../SidebarMenu/styles'

import { navigate } from '@/utils/navigation'

type RightActionsProps = {
  translation: SharedValue<number>
  chaptersNumber: number[]
  rightActionsIsOpen: boolean
  bookName: string
}

const RightActions = ({
  translation,
  chaptersNumber,
  rightActionsIsOpen,
  bookName
}: RightActionsProps) => {
  const window = useWindowDimensions()
  const windowWidth = window.width

  const handleChapterNavigation = useCallback(
    (index: number) => {
      navigate('Book', {
        bookName,
        initialScrollIndex: index
      })
    },
    [bookName]
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translation.value + windowWidth - SIDEBAR_MENU_WIDTH }
      ]
    }
  })

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
    [handleChapterNavigation]
  )

  return (
    <Reanimated.View style={[styles.container, animatedStyle]}>
      {rightActionsIsOpen && (
        <FlashList
          horizontal
          nestedScrollEnabled
          data={chaptersNumber}
          keyExtractor={item => item.toString()}
          style={styles.list(windowWidth)}
          contentContainerStyle={styles.listContent}
          renderItem={renderChapterItem}
          renderScrollComponent={ScrollView}
        />
      )}
    </Reanimated.View>
  )
}

export default memo(RightActions)
