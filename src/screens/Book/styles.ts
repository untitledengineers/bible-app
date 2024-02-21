import { StyleSheet, Platform, Animated } from 'react-native'
import styled, { css } from 'styled-components/native'
import Constants from 'expo-constants'

export const ITEM_SEPARATOR_HEIGHT = 10
export const LIST_HEADER_HEIGHT = 112

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 10}px;
`

const Text = css`
  font-family: 'Cardo_400Regular';
  color: #3d3424;
  text-align: justify;
`

export const AnimatedHeader = styled(Animated.View)`
  z-index: 99;
`

export const ListHeader = styled.View`
  height: ${LIST_HEADER_HEIGHT}px;
  align-items: center;
  justify-content: center;
`

export const ListHeaderText = styled.Text`
  ${Text}
  text-align: center;
  margin: 12px 0px;
  font-size: 24px;
  font-family: 'Cardo_700Bold';
`

export const ListHeaderSeparator = styled.View`
  border-bottom-color: #999;
  border-bottom-width: ${StyleSheet.hairlineWidth + 0.5}px;
  width: 50px;
`

export const Item = styled.View`
  margin: 2px 0px;
  flex-direction: row;
`

export const ItemSeparator = styled.View`
  height: ${ITEM_SEPARATOR_HEIGHT}px;
`

export const VerseNumber = styled.Text`
  ${Text}
  font-size: 14px;
`

export const Verse = styled.Text`
  ${Text}
  flex-shrink: 1;
  font-size: 20px;
`
