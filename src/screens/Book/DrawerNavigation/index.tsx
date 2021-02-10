import React, { useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import * as S from './styles';

type DrawerProps = {
  bookLength: number;
  handleScroll: (index: number) => void;
};

const DrawerNavigation = ({ bookLength, handleScroll }: DrawerProps) => {
  const bookChapters = useMemo(() =>
    Array.from({length: bookLength}, (_, i) => i + 1),[bookLength]);

  const renderItem: ListRenderItem<number> = ({ index }) => (
    <S.Item onPress={() => handleScroll(index)}>
      <S.ItemContent>{index + 1}</S.ItemContent>
    </S.Item>
  );

  const renderItemSeparator = () => (
    <S.ItemSeparator>{'\u2B24'}</S.ItemSeparator>
  );

  return (
    <FlatList
      data={bookChapters}
      keyExtractor={item => item.toString()}
      renderItem={renderItem}
      initialNumToRender={21}
      scrollEventThrottle={16}
      ItemSeparatorComponent={renderItemSeparator}
      contentContainerStyle={{
        paddingVertical: 4,
      }}
    />
  );
};

export default DrawerNavigation;
