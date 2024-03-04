import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.overlay10
  },
  item: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.mediumPlus
  },
  itemContent: {
    fontSize: 28,
    fontFamily: 'Cardo_400Regular_Italic',
    color: theme.colors.primary
  },
  content: {
    marginLeft: theme.spacing.largePlus
  },
  button: {
    paddingVertical: theme.spacing.small,
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  title: {
    fontSize: 22,
    marginBottom: theme.spacing.tiny,
    fontFamily: 'Cardo_700Bold',
    color: theme.colors.primary
  },
  chapter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chapterText: {
    fontSize: 16,
    fontFamily: 'Cardo_400Regular_Italic',
    color: theme.colors.border
  }
}))
