import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
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
  const listRef = useRef<FlatList>(null);

  const [nextListIndex, setNextListIndex] = useState(0);

  const handleScrollLeft = () => {
    const isBiggerThanZero = nextListIndex > 0;

    if(isBiggerThanZero) {
      setNextListIndex(prev => prev - 1);
      listRef.current?.scrollToIndex({ index: nextListIndex - 1, animated: true });
    }
  }

  const handleScrollRight = () => {
    const isLessThanChaptersLength = nextListIndex < book.chaptersNumber.length - 4;

    if(isLessThanChaptersLength) {
      setNextListIndex(prev => prev + 1);
      listRef.current?.scrollToIndex({ index: nextListIndex + 1, animated: true });
    }
  }

  const handleNavigate = (index: number) => {
    navigation.navigate('Book', {
      bookName: book.name,
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
        <S.Item onPress={handleScrollLeft}>
          <S.ItemContent>&lt;</S.ItemContent>
        </S.Item>

        <FlatList
          ref={listRef}
          data={book.chaptersNumber}
          keyExtractor={chapter => chapter.toString()}
          renderItem={renderItem}
          horizontal
          scrollEventThrottle={16}
          nestedScrollEnabled
        />

        <S.Item onPress={handleScrollRight}>
          <S.ItemContent>&gt;</S.ItemContent>
        </S.Item>
      </S.ListContainer>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} containerStyle={{ overflow: 'hidden'}}>{children}</Swipeable>
  );
};

export default SwipeableButton;
