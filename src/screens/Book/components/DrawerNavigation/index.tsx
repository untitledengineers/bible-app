import React, { useCallback } from 'react'
import { ListRenderItem, Text, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { useBookController } from '../../useBookController'

type DrawerProps = {
  handleScroll: (index: number) => void
}

const DrawerNavigation = ({ handleScroll }: DrawerProps) => {
  const { chaptersNumber } = useBookController()
  const { styles, theme } = useStyles(stylesheet)

  const renderItem: ListRenderItem<number> = useCallback(
    ({ index }) => (
      <TouchableOpacity style={styles.item} onPress={() => handleScroll(index)}>
        <Text style={styles.itemContent}>{index + 1}</Text>
      </TouchableOpacity>
    ),
    [handleScroll, styles]
  )

  const renderItemSeparator = useCallback(
    () => <Text style={styles.itemSeparator}>{'\u2B24'}</Text>,
    [styles]
  )

  return (
    <FlatList
      data={chaptersNumber}
      keyExtractor={item => item.toString()}
      renderItem={renderItem}
      initialNumToRender={21}
      scrollEventThrottle={16}
      ItemSeparatorComponent={renderItemSeparator}
      contentContainerStyle={{
        paddingVertical: theme.spacing.tiny
      }}
    />
  )
}

export default DrawerNavigation
