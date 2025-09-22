import { StyleSheet } from 'react-native-unistyles'

export const HEADER_HEIGHT = 56

export const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing.medium
  },
  animatedTitle: {
    color: theme.colors.primary,
    fontFamily: 'Cardo_700Bold'
  },
  fontScaleWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: theme.spacing.medium
  },
  fontScaleButton: {
    marginLeft: theme.spacing.medium
  }
}))
