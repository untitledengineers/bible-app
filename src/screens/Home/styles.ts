import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    paddingTop: Constants.statusBarHeight
  },
  separator: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
}))
