/* eslint-disable no-plusplus */
import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import * as S from './styles'

type DrawerProps = {
  chaptersNumber: number[]
  handleScroll: (index: number) => void
}

const DrawerNavigation = ({ chaptersNumber, handleScroll }: DrawerProps) => {
  const renderItem: ListRenderItem<number> = ({ index }) => (
    <S.Item onPress={() => handleScroll(index)}>
      <S.ItemContent>{index + 1}</S.ItemContent>
    </S.Item>
  )

  const renderItemSeparator = () => (
    <S.ItemSeparator>{'\u2B24'}</S.ItemSeparator>
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
