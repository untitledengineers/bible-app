import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
`

export const Separator = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`
