import { Platform, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Constants from 'expo-constants'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 10}px;
`

export const Separator = styled.View`
  border-bottom-color: #999;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`
