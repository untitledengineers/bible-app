import React from 'react'
import { FlatList, Animated, ListRenderItem, ViewToken } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'

import { ItemSeparator } from './styles'
import ListHeader from '../../components/ListHeader'
import { useBookController } from '../../useBookController'
import Chapter from '../Chapter'

type ListProps = {
  scrollY: Animated.Value
  listRef: React.RefObject<FlatList>
  viewConfigRef: React.MutableRefObject<{
    itemVisiblePercentThreshold: number
    minimumViewTime: number
  }>
  onViewRef: React.MutableRefObject<
    (info: { viewableItems: ViewToken[] }) => void
  >
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
  viewConfigRef,
  onViewRef
}: ListProps) => {
  const { bookName, bookChapters, HEADER_APP_MAX_HEIGHT, handleDoubleTap } =
    useBookController()

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
        ItemSeparatorComponent={<ItemSeparator />}
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
  )
}

export default List
