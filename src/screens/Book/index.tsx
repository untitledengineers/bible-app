import React from 'react'
import { FlatList, Animated, ListRenderItem } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { TapGestureHandler } from 'react-native-gesture-handler'

import DrawerNavigation from './components/DrawerNavigation'

import HeaderApp from '../../components/Header'
import {
  Container,
  Item,
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
    HEADER_APP_MAX_HEIGHT,
    handleDoubleTap
  } = useBookController()

  const renderHeader = (text: string) => (
    <ListHeader>
      <ListHeaderSeparator />

      <ListHeaderText>{text}</ListHeaderText>

      <ListHeaderSeparator />
    </ListHeader>
  )

  const renderChapterItem: ListRenderItem<string[]> = ({ item, index }) => (
    <>
      {index !== 0 && renderHeader(String(index + 1))}

      {item.map((verse, vIndex) => {
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
        useNativeAnimations={false}
      >
        <AnimatedHeader
          style={{
            transform: [{ translateY }]
          }}
        >
          <HeaderApp titleOpacity={titleOpacity} title={bookName} />
        </AnimatedHeader>

        <TapGestureHandler
          onHandlerStateChange={handleDoubleTap}
          numberOfTaps={2}
        >
          <AnimatedFlatList
            ref={listRef}
            data={bookChapters}
            keyExtractor={(chapter: string[]) => chapter[1].toString()}
            renderItem={renderChapterItem}
            ListHeaderComponent={() => renderHeader(bookName)}
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
        </TapGestureHandler>
      </DrawerLayout>
    </Container>
  )
}

export default Book
