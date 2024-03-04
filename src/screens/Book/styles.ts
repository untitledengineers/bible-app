import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 10
  }
})
