import React from 'react'
import { Feather } from '@expo/vector-icons'

import { useSearch } from '../../context/search'
import { useTheme } from '../../context/theme'

import { Container } from './styles'

const SidebarMenu = () => {
  const { handleOpen } = useSearch()
  const { theme } = useTheme()

  const handleSearchButton = () => {
    handleOpen()
  }

  return (
    <Container colors={theme.colors.gradient} start={[1, 0.2]}>
      <Feather
        name="search"
        size={30}
        color={theme.colors.background}
        onPress={handleSearchButton}
      />
    </Container>
  )
}

export default SidebarMenu
