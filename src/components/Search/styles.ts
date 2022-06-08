import { Platform, StyleSheet, TextInput } from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`

export const Header = styled(LinearGradient).attrs(() => ({
  colors: ['#cabca4', '#b7a584'],
  start: [1, 0.2]
}))`
  position: absolute;
  right: 0;
  left: 0;
  height: 120px;
  padding-top: ${Platform.OS === 'android'
    ? Constants.statusBarHeight + 10
    : 10}px;
`

export const Input = styled(TextInput).attrs(() => ({
  placeholder: '',
  padding: 16,
  returnKeyType: 'search',
  underlineColorAndroid: 'transparent',
  selectionColor: '#ffffff'
}))`
  font-size: 22px;
  color: #ffffff;
  font-family: 'Cardo_700Bold';
`

export const CloseButton = styled(Feather).attrs(() => ({
  name: 'x',
  size: 24,
  color: '#ffffff'
}))`
  align-self: flex-end;
  margin-right: 20px;
`

export const SectionWrapper = styled.View``

export const SectionHeader = styled.Text`
  font-family: 'Cardo_400Regular_Italic';
  font-size: 20px;
  margin-top: 8px;
  color: #3d3424;
`

export const SectionSeparator = styled.View`
  border-bottom-color: #3d3424;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`

export const BookNameWrapper = styled.TouchableOpacity``

export const BookName = styled.Text`
  font-family: 'Cardo_400Regular';
  font-size: 20px;
  margin-top: 8px;
  color: #3d3424;
`

export const VerseWrapper = styled.TouchableOpacity`
  margin: 8px 0;
`

export const Verse = styled.Text.attrs(() => ({
  numberOfLines: 2
}))`
  font-family: 'Cardo_400Regular';
  font-size: 18px;
  margin-bottom: 4px;
  color: #3d3424;
`

export const VerseLocation = styled.Text`
  font-family: 'Cardo_400Regular_Italic';
  font-size: 12px;
  color: #3d3424;
`

export const SectionFooter = styled.View`
  margin-bottom: 24px;
`
