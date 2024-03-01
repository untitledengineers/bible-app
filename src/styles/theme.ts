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
} as const

const darkTheme = {
  name: ThemeType.dark,
  colors: darkColors,
  spacing
} as const

export { lightTheme, darkTheme, ThemeType }
