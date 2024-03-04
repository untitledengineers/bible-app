import React from 'react'
import {
  FlatList,
  Animated,
  ListRenderItem,
  ViewToken,
  View
} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'

import ListHeader from '../../components/ListHeader'
import { useBookController } from '../../useBookController'
import Chapter from '../Chapter'

type ListProps = {
  scrollY: Animated.Value
  listRef: React.RefObject<FlatList>
  onViewableItemsChanged: (info: { viewableItems: ViewToken[] }) => void
  handleOnScrollFailed: (info: {
    index: number
    averageItemLength: number
  }) => void
}

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList)

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

  const renderChapterItem: ListRenderItem<string[]> = ({
    item,
    index: chapterIndex
  }) => <Chapter item={item} chapterIndex={chapterIndex} />

  return (
    <TapGestureHandler onHandlerStateChange={handleDoubleTap} numberOfTaps={2}>
      <AnimatedFlatList
        ref={listRef}
        data={bookChapters}
        keyExtractor={(chapter: string[]) => chapter[1]}
        renderItem={renderChapterItem}
        ListHeaderComponent={<ListHeader text={bookName} />}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
        initialNumToRender={2}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: HEADER_APP_MAX_HEIGHT
        }}
        onScrollToIndexFailed={handleOnScrollFailed}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </TapGestureHandler>
  )
}

export default List
