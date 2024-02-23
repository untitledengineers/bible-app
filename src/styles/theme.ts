import { lightColors, darkColors } from './colors'
import { spacing } from './spacing'

enum ThemeType {
  dark = 'dark',
  light = 'light'
}

const lightTheme = {
  name: ThemeType.light,
  colors: lightColors,
  spacing
}

const darkTheme = {
  name: ThemeType.dark,
  colors: darkColors,
  spacing
}

export { lightTheme, darkTheme, ThemeType }
