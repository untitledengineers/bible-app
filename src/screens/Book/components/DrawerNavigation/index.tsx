import React, { useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import * as S from './styles'
import { useBookController } from '../../useBookController'

type DrawerProps = {
  handleScroll: (index: number) => void
}

const DrawerNavigation = ({ handleScroll }: DrawerProps) => {
  const { chaptersNumber } = useBookController()

  const renderItem: ListRenderItem<number> = useCallback(
    ({ index }) => (
      <S.Item onPress={() => handleScroll(index)}>
        <S.ItemContent>{index + 1}</S.ItemContent>
      </S.Item>
    ),
    [handleScroll]
  )

  const renderItemSeparator = useCallback(
    () => <S.ItemSeparator>{'\u2B24'}</S.ItemSeparator>,
    []
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
        paddingVertical: 4
      }}
    />
  )
}

export default DrawerNavigation
