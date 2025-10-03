import { StyleSheet } from 'react-native-unistyles'

export const LIST_HEADER_HEIGHT = 112

export const styles = StyleSheet.create(theme => ({
  container: {
    height: LIST_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Cardo_700Bold',
    marginVertical: theme.spacing.small
  },
  separator: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth + 0.5,
    width: 50
  }
}))
