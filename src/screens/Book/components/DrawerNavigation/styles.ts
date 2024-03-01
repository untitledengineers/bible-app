import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.smaller
  },
  itemContent: {
    fontSize: 16,
    fontFamily: 'Cardo_700Bold',
    color: theme.colors.primary
  },
  itemSeparator: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Cardo_400Regular',
    color: theme.colors.primary
  }
}))
