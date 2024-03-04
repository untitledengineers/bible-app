import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { UnistylesRuntime, useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'
import { useSearch } from '../../context/search'
import { ThemeType } from '../../styles'

const SidebarMenu = () => {
  const { handleOpen } = useSearch()
  const { styles, theme } = useStyles(stylesheet)
  const isLightTheme = UnistylesRuntime.themeName === ThemeType.light

  const toggleTheme = () => {
    UnistylesRuntime.setTheme(isLightTheme ? ThemeType.dark : ThemeType.light)
  }

  return (
    <LinearGradient style={styles.container} colors={theme.colors.gradient}>
      <Feather
        testID="theme-button"
        name={isLightTheme ? 'moon' : 'sun'}
        size={30}
        color={theme.colors.white}
        onPress={toggleTheme}
      />
      <Feather
        name="search"
        size={30}
        color={theme.colors.white}
        style={styles.searchIcon}
        onPress={handleOpen}
      />
    </LinearGradient>
  )
}

export default SidebarMenu
