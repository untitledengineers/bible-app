import React, { createContext, useState, useContext, useCallback } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

import { darkTheme, lightTheme, ThemeType } from '../styles'

interface ThemeContextData {
  theme: typeof lightTheme
  toggleTheme(): void
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const [theme, setTheme] = useState(lightTheme)

  const toggleTheme = useCallback(() => {
    setTheme(theme.name === ThemeType.light ? darkTheme : lightTheme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <StatusBar style={theme.name === ThemeType.light ? 'dark' : 'light'} />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
