import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create(theme => ({
  image: {
    height: 400,
    width: '98%'
  },
  notShowAgainWrapper: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  notShowAgainText: {
    marginLeft: theme.spacing.smaller,
    color: theme.colors.primary
  }
}))
