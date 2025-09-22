import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create(theme => ({
  verseNumber: (fontScale: number) => ({
    fontFamily: 'Cardo_400Regular',
    color: theme.colors.primary,
    fontSize: 14 * fontScale
  }),
  verse: (backgroundColor: string, fontScale: number) => ({
    fontFamily: 'Cardo_400Regular',
    color: theme.colors.primary,
    flexShrink: 1,
    marginVertical: 2,
    fontSize: 20 * fontScale,
    lineHeight: 30 * fontScale,
    backgroundColor
  })
}))
