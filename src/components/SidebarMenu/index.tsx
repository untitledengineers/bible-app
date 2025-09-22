import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBarStyle } from 'node_modules/react-native-unistyles/src/specs/types'
import React from 'react'
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles'

import { styles } from './styles'
import { useSearch } from '../../context/search'
import { ThemeType } from '../../styles'

const SidebarMenu = () => {
  const { handleOpen } = useSearch()
  const { theme } = useUnistyles()
  const isLightTheme = UnistylesRuntime.themeName === ThemeType.light

  const toggleTheme = () => {
    const newTheme = isLightTheme ? ThemeType.dark : ThemeType.light
    UnistylesRuntime.setTheme(newTheme)
    UnistylesRuntime.statusBar.setStyle(
      newTheme === ThemeType.dark ? StatusBarStyle.Light : StatusBarStyle.Dark
    )
    AsyncStorage.setItem('@theme', newTheme)
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={theme.colors.gradient as [string, string, string, string]}
    >
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
