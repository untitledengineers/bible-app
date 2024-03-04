import Constants from 'expo-constants'
import { Platform, StyleSheet } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  header: {
    height: 120,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight + 10 : 10
  },
  input: {
    padding: theme.spacing.medium,
    fontSize: 22,
    color: theme.colors.white,
    fontFamily: 'Cardo_700Bold'
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: theme.spacing.medium
  },
  sectionHeader: {
    fontFamily: 'Cardo_400Regular_Italic',
    fontSize: 20,
    marginTop: theme.spacing.smaller,
    color: theme.colors.primary
  },
  sectionSeparator: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  bookName: {
    fontFamily: 'Cardo_400Regular',
    fontSize: 20,
    marginTop: theme.spacing.smaller,
    color: theme.colors.primary
  },
  verseWrapper: {
    marginVertical: theme.spacing.smaller
  },
  verse: {
    fontFamily: 'Cardo_400Regular',
    fontSize: 18,
    color: theme.colors.primary,
    marginBottom: theme.spacing.tiny
  },
  verseLocation: {
    fontFamily: 'Cardo_400Regular_Italic',
    fontSize: 12,
    color: theme.colors.primary
  },
  sectionFooter: {
    marginBottom: theme.spacing.mediumPlus
  }
}))
