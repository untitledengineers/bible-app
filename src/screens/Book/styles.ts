import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 10
  }
})
