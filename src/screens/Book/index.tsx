import React from 'react'
import { FlatList, Animated, ListRenderItem } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

import DrawerNavigation from './components/DrawerNavigation'
import Verse from './components/Verse'
import { useBookController } from './hooks/useBookController'
import {
  Container,
  ItemSeparator,
  ListHeader,
  ListHeaderSeparator,
  ListHeaderText,
  AnimatedHeader
} from './styles'
import HeaderApp from '../../components/Header'

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
    handleDoubleTap,
    theme
  } = useBookController()

  const renderHeader = (text: string) => (
    <ListHeader>
      <ListHeaderSeparator />

      <ListHeaderText>{text}</ListHeaderText>

      <ListHeaderSeparator />
    </ListHeader>
  )

  const renderChapterItem: ListRenderItem<string[]> = ({
    item,
    index: chapterIndex
  }) => (
    <>
      {chapterIndex !== 0 && renderHeader(String(chapterIndex + 1))}

      {item.map((verse, verseIndex) => {
        return (
          <Verse
            key={`${chapterIndex}-${verseIndex}`}
            chapter={chapterIndex + 1}
            number={verseIndex + 1}
            text={verse}
          />
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
        drawerBackgroundColor={theme.colors.background}
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
