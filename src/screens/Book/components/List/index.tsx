import React, { useCallback } from 'react'
import {
  SectionList,
  Animated,
  ViewToken,
  SectionListRenderItem,
  SectionListData
} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'

import ListHeader from '../../components/ListHeader'
import { BookChapter, useBookController } from '../../useBookController'
import Verse from '../Verse'

type ListProps = {
  scrollY: Animated.Value
  listRef: React.RefObject<SectionList>
  onViewableItemsChanged: (info: { viewableItems: ViewToken[] }) => void
  handleOnScrollFailed: (info: {
    index: number
    averageItemLength: number
  }) => void
}

const AnimatedSectionList = Animated.createAnimatedComponent<any>(SectionList)

const List = ({
  scrollY,
  handleOnScrollFailed,
  listRef,
  onViewableItemsChanged
}: ListProps) => {
  const {
    bookName,
    bookChapters,
    HEADER_APP_MAX_HEIGHT,
    handleDoubleTap,
    viewabilityConfig
  } = useBookController()

  const renderItem: SectionListRenderItem<string> = useCallback(
    ({ item, index: verseIndex, section: { title: chapterIndex } }) => (
      <Verse
        key={`${item}-${verseIndex}`}
        text={item}
        number={verseIndex + 1}
        chapter={chapterIndex}
      />
    ),
    []
  )

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: SectionListData<BookChapter> }) =>
      title > 1 ? <ListHeader text={title} /> : null,
    []
  )

  return (
    <TapGestureHandler onHandlerStateChange={handleDoubleTap} numberOfTaps={2}>
      <AnimatedSectionList
        ref={listRef}
        sections={bookChapters}
        keyExtractor={(item: string, index: number) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={<ListHeader text={bookName} />}
        onScrollToIndexFailed={handleOnScrollFailed}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: HEADER_APP_MAX_HEIGHT
        }}
      />
    </TapGestureHandler>
  )
}

export default List
