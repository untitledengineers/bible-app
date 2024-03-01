import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 56
  },
  searchIcon: {
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.mediumPlus
  }
}))
