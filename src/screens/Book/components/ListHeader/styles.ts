import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const LIST_HEADER_HEIGHT = 112

export const Container = styled.View`
  height: ${LIST_HEADER_HEIGHT}px;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 12px 0px;
  font-size: 28px;
  font-family: 'Cardo_700Bold';
`

export const Separator = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: ${StyleSheet.hairlineWidth + 0.5}px;
  width: 50px;
`
