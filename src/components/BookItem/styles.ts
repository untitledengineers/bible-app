import { createStyleSheet } from 'react-native-unistyles'

import { SIDEBAR_MENU_WIDTH } from '../SidebarMenu/styles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.overlay10
  },
  list: (windowWidth: number) => ({
    height: '100%',
    width: windowWidth - SIDEBAR_MENU_WIDTH
  }),
  listContent: {
    alignItems: 'center'
  },
  item: {
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
