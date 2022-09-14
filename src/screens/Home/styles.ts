import { Platform, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import Constants from 'expo-constants'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 10}px;
`

export const Content = styled.View`
  margin-left: 40px;
`

export const Button = styled(RectButton)`
  padding: 10px 0px;
  justify-content: center;
  background-color: #efebe4;
`

export const Title = styled.Text`
  font-size: 22px;
  margin-bottom: 4px;
  font-family: 'Cardo_700Bold';
  color: #3d3424;
`

export const Chapter = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ChapterText = styled.Text`
  font-size: 16px;
  font-family: 'Cardo_400Regular_Italic';
  color: #999;
`

export const Separator = styled.View`
  border-bottom-color: #999;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`
