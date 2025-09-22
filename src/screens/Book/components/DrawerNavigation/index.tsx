import { FlashList, ListRenderItem } from '@shopify/flash-list'
import React, { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'

import { styles } from './styles'

type DrawerProps = {
  chaptersNumber: number[]
  handleScroll: (index: number) => void
}

const DrawerNavigation = ({ chaptersNumber, handleScroll }: DrawerProps) => {
  const { theme } = useUnistyles()

  const renderItem: ListRenderItem<number> = useCallback(
    ({ index }) => (
      <TouchableOpacity style={styles.item} onPress={() => handleScroll(index)}>
        <Text style={styles.itemContent}>{index + 1}</Text>
      </TouchableOpacity>
    ),
    [handleScroll]
  )

  const renderItemSeparator = useCallback(
    () => <Text style={styles.itemSeparator}>{'\u2B24'}</Text>,
    []
  )

  return (
    <FlashList
      data={chaptersNumber}
      keyExtractor={item => item.toString()}
      renderItem={renderItem}
      scrollEventThrottle={16}
      ItemSeparatorComponent={renderItemSeparator}
      contentContainerStyle={{
        paddingVertical: theme.spacing.tiny
      }}
    />
  )
}

export default DrawerNavigation
