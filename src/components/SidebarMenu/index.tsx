import { Feather } from '@expo/vector-icons'
import React from 'react'

import { Container } from './styles'
import { useSearch } from '../../context/search'
import { useTheme } from '../../context/theme'
import { ThemeType } from '../../styles'

const SidebarMenu = () => {
  const { handleOpen } = useSearch()
  const { theme, toggleTheme } = useTheme()

  const handleSearchButton = () => {
    handleOpen()
  }

  return (
    <Container colors={theme.colors.gradient}>
      <Feather
        name={theme.name === ThemeType.light ? 'moon' : 'sun'}
        size={30}
        color={theme.colors.white}
        onPress={toggleTheme}
      />
      <Feather
        name="search"
        size={30}
        color={theme.colors.white}
        onPress={handleSearchButton}
        style={{ marginTop: 32, marginBottom: 24 }}
      />
    </Container>
  )
}

export default SidebarMenu
