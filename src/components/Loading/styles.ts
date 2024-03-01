import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay50
  }
}))
