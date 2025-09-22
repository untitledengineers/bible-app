import { StyleSheet } from 'react-native-unistyles'

export const SIDEBAR_MENU_WIDTH = 56

export const styles = StyleSheet.create(theme => ({
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
