import { Platform, StyleSheet, TextInput } from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient
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
  placeholder: 'Digite uma palavra-chave',
  padding: 16,
  returnKeyType: 'search',
  underlineColorAndroid: 'transparent'
}))`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Cardo_700Bold';
`

export const CloseButton = styled(Feather).attrs(({ theme }) => ({
  name: 'x',
  size: 24,
  color: theme.colors.white
}))`
  align-self: flex-end;
  margin-right: 20px;
`

export const SectionWrapper = styled.View``

export const SectionHeader = styled.Text`
  font-family: 'Cardo_400Regular_Italic';
  font-size: 20px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
`

export const SectionSeparator = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.primary};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`

export const BookNameWrapper = styled.TouchableOpacity``

export const BookName = styled.Text`
  font-family: 'Cardo_400Regular';
  font-size: 20px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
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
  color: ${({ theme }) => theme.colors.primary};
`

export const VerseLocation = styled.Text`
  font-family: 'Cardo_400Regular_Italic';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`

export const SectionFooter = styled.View`
  margin-bottom: 24px;
`
