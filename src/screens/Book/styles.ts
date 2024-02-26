import Constants from 'expo-constants'
import { StyleSheet, Platform, Animated } from 'react-native'
import styled from 'styled-components/native'

export const ITEM_SEPARATOR_HEIGHT = 10
export const LIST_HEADER_HEIGHT = 112

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 10}px;
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
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 12px 0px;
  font-size: 28px;
  font-family: 'Cardo_700Bold';
`

export const ListHeaderSeparator = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: ${StyleSheet.hairlineWidth + 0.5}px;
  width: 50px;
`

export const ItemSeparator = styled.View`
  height: ${ITEM_SEPARATOR_HEIGHT}px;
`
