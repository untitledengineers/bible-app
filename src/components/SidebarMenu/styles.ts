import { createStyleSheet } from 'react-native-unistyles'

export const SIDEBAR_MENU_WIDTH = 56

export const stylesheet = createStyleSheet(theme => ({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SIDEBAR_MENU_WIDTH
  },
  searchIcon: {
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.mediumPlus
  }
}))
