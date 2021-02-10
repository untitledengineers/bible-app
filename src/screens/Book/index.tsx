import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  FlatList,
  Animated,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import bibleBooks from '../../data/bible_ptbr';

import DrawerNavigation from './DrawerNavigation';

import HeaderApp from '../../components/Header';

import { useLoading } from '../../context/loading';

import {
  Container,
  Item,
  FirstVerseNumber,
  VerseNumber,
  Verse,
  ItemSeparator,
  ListHeader,
  ListHeaderSeparator,
  ListHeaderText,
  AnimatedHeader,
} from './styles';

import { IBook } from '../../screens/Home';

type Params = {
  book: IBook;
  initialScrollIndex?: number;
};

type Chapter = {
  [key: string]: {
    [key: string]: string;
  };
}

const HEADER_APP_MAX_HEIGHT = 40;
const HEADER_APP_MIN_HEIGHT = 0;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Book = () => {
  const route = useRoute();
  const { book, initialScrollIndex } = route.params as Params;
  const [bookChapters, setBookChapters] = useState<Chapter[]>([]);
  const [indexViewable, setIndexViewable] = useState<number | null>(0);
  const [indexToScroll, sentIndexToScroll] = useState(0);
  const listRef = useRef<FlatList>(null);
  const drawerRef = useRef<DrawerLayout>(null);
  const { isVisible, handleVisible } = useLoading();
  const window = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(
    scrollY,
    HEADER_APP_MIN_HEIGHT,
    HEADER_APP_MAX_HEIGHT,
  );
  const translateY: Animated.AnimatedInterpolation = diffClamp.interpolate({
    inputRange: [HEADER_APP_MIN_HEIGHT, HEADER_APP_MAX_HEIGHT],
    outputRange: [HEADER_APP_MIN_HEIGHT, -HEADER_APP_MAX_HEIGHT],
    extrapolate: 'clamp',
  });

  const viewConfigRef = React.useRef({
    itemVisiblePercentThreshold: 5,
    minimumViewTime: 150,
  });

  // This useRef is necessary to fix a bug on the flatlist.
  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    setIndexViewable(info.viewableItems[0]?.index);
  });

  const handleScrollToIndex = useCallback((index: number) => {
    drawerRef.current?.closeDrawer();

    listRef.current?.scrollToIndex({ animated: true, index });

    sentIndexToScroll(index);
  }, []);

  useEffect(() => {
    const bookChaptersJson = bibleBooks[book.name];

    setBookChapters(bookChaptersJson);

    if (initialScrollIndex) {
      sentIndexToScroll(initialScrollIndex);
    }
  }, [initialScrollIndex]);

  useEffect(() => {
    if (indexViewable === indexToScroll && isVisible) {
      handleVisible(false);
    }
  }, [handleVisible, indexToScroll, indexViewable, isVisible]);

  useEffect(() => {
    return () => {
      if (isVisible) {
        handleVisible(false);
      }
    };
  }, [handleVisible, isVisible]);

  const handleOnScrollFailed = (info: {
    index: number;
    averageItemLength: number;
  }) => {
    if (!isVisible) {
      handleVisible(true);
    }

    listRef.current?.scrollToOffset({
      offset: info.averageItemLength * info.index,
    });

    setTimeout(() => {
      listRef.current?.scrollToIndex({ index: info.index, animated: true });
    }, 100);
  };

  const renderChapterItem = ({
    item,
  }: {
    item: Chapter;
  }) => {
    const [chapterNumber] = Object.keys(item);
    const [chapterVersesObj] = Object.values(item);
    const chapterVersesArray = Object.values(chapterVersesObj);

    return (
      <>
        {chapterVersesArray.map((verse, vIndex) => (
          <Item key={chapterNumber + vIndex}>
            {vIndex === 0 && <FirstVerseNumber>{chapterNumber}</FirstVerseNumber>}

            <Verse>
              {vIndex !== 0 && <VerseNumber>{vIndex + 1}</VerseNumber>} {verse}
            </Verse>
          </Item>
        ))}
      </>
    );
  };

  const renderHeader = () => (
    <ListHeader>
      <ListHeaderSeparator />

      <ListHeaderText>{book.name}</ListHeaderText>

      <ListHeaderSeparator />
    </ListHeader>
  );

  return (
    <Container>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={40}
        edgeWidth={window.width}
        drawerPosition="right"
        drawerType="slide"
        overlayColor="transparent"
        drawerBackgroundColor="#efebe4"
        renderNavigationView={() => (
          <DrawerNavigation
            handleScroll={handleScrollToIndex}
            bookLength={book.length}
          />
        )}
      >
        <AnimatedHeader
          style={{
            transform: [{ translateY }],
          }}
        >
          <HeaderApp />
        </AnimatedHeader>

        <AnimatedFlatList
          ref={listRef}
          data={bookChapters}
          keyExtractor={(chapter: Chapter) => Object.keys(chapter)[0]}
          renderItem={renderChapterItem}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={() => <ItemSeparator />}
          initialNumToRender={2}
          initialScrollIndex={initialScrollIndex || 0}
          scrollEventThrottle={16}
          nestedScrollEnabled
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: HEADER_APP_MAX_HEIGHT,
          }}
          onScrollToIndexFailed={handleOnScrollFailed}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          windowSize={50}
        />
      </DrawerLayout>
    </Container>
  );
};

export default Book;
