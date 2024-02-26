import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { createContext, useState, useContext, useCallback } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { darkTheme, lightTheme, ThemeType } from '../styles'

interface ThemeContextData {
  theme: typeof lightTheme
  setTheme(theme: typeof lightTheme): void
  toggleTheme(): void
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const [theme, setTheme] = useState(lightTheme)

  const toggleTheme = useCallback(() => {
    const newTheme = theme.name === ThemeType.light ? darkTheme : lightTheme
    setTheme(newTheme)

    AsyncStorage.setItem('@theme', JSON.stringify(newTheme))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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
