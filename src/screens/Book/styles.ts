import Constants from 'expo-constants'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? Constants.statusBarHeight : 10}px;
`
