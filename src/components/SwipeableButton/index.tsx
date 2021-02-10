import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { IBook } from '../../screens/Home';

import * as S from './styles';

type SwipeableButtonProps = {
  book: IBook;
};

const SwipeableButton = ({
  children,
  book,
}: React.PropsWithChildren<SwipeableButtonProps>) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const bookChapters = useMemo(() =>
    Array.from({length: book.length}, (_, i) => i + 1),[book.length]);

  const handleNavigate = (index: number) => {
    navigation.navigate('Book', {
      book,
      initialScrollIndex: index,
    });
  };

  const renderItem: ListRenderItem<number> = ({ index }) => (
    <S.Item onPress={() => handleNavigate(index)}>
      <S.ItemContent>{index + 1}</S.ItemContent>
    </S.Item>
  );

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [window.width, 0],
      extrapolate: 'clamp',
    });

    return (
      <S.ListContainer
        style={{
          transform: [{ translateX }],
        }}
      >
        <FlatList
          data={bookChapters}
          keyExtractor={chapter => chapter.toString()}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        />
      </S.ListContainer>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

export default SwipeableButton;
