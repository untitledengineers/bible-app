import React, { createContext, useState, useContext, useCallback } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { darkTheme, lightTheme } from '../theme'

enum ThemeType {
  dark = 'dark',
  light = 'light'
}

interface ThemeContextData {
  theme: ThemeType
  toggleTheme(): void
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const [theme, setTheme] = useState(ThemeType.light)

  const toggleTheme = useCallback(() => {
    setTheme(theme === ThemeType.light ? ThemeType.dark : ThemeType.light)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider
        theme={theme === ThemeType.light ? lightTheme : darkTheme}
      >
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
