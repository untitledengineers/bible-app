import React from 'react'
import { FlatList, Animated, ListRenderItem } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import DrawerNavigation from './components/DrawerNavigation'

import HeaderApp from '../../components/Header'
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
  AnimatedHeader
} from './styles'
import { useBookController } from './hooks/useBookController'

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList)

const Book = () => {
  const {
    drawerRef,
    onViewRef,
    viewConfigRef,
    bookName,
    window,
    handleScrollToIndex,
    chaptersNumber,
    translateY,
    titleOpacity,
    listRef,
    bookChapters,
    handleOnScrollFailed,
    scrollY,
    HEADER_APP_MAX_HEIGHT
  } = useBookController()

  const renderChapterItem: ListRenderItem<string[]> = ({ item, index }) => (
    <>
      {item.map((verse, vIndex) => {
        if (vIndex === 0) {
          return (
            <Item key={`${index}-${vIndex}`}>
              <FirstVerseNumber>{index + 1}</FirstVerseNumber>

              <Verse>{verse}</Verse>
            </Item>
          )
        }

        return (
          <Item key={`${index}-${vIndex}`}>
            <Verse>
              <VerseNumber>{vIndex + 1}</VerseNumber> {verse}
            </Verse>
          </Item>
        )
      })}
    </>
  )

  const renderHeader = () => (
    <ListHeader>
      <ListHeaderSeparator />

      <ListHeaderText>{bookName}</ListHeaderText>

      <ListHeaderSeparator />
    </ListHeader>
  )

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
            chaptersNumber={chaptersNumber}
          />
        )}
      >
        <AnimatedHeader
          style={{
            transform: [{ translateY }]
          }}
        >
          <HeaderApp titleOpacity={titleOpacity} title={bookName} />
        </AnimatedHeader>

        <AnimatedFlatList
          ref={listRef}
          data={bookChapters}
          keyExtractor={(chapter: string[]) => chapter[1].toString()}
          renderItem={renderChapterItem}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={() => <ItemSeparator />}
          initialNumToRender={2}
          scrollEventThrottle={16}
          nestedScrollEnabled
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: HEADER_APP_MAX_HEIGHT
          }}
          onScrollToIndexFailed={handleOnScrollFailed}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          windowSize={50}
        />
      </DrawerLayout>
    </Container>
  )
}

export default Book
