import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  verseNumber: {
    fontFamily: 'Cardo_400Regular',
    color: theme.colors.primary
  },
  verse: {
    fontFamily: 'Cardo_400Regular',
    color: theme.colors.primary,
    flexShrink: 1,
    marginVertical: 2
  }
}))
