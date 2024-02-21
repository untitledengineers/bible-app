import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useSearch } from '../../context/search'

import { Container } from './styles'

const SidebarMenu = () => {
  const { handleOpen } = useSearch()

  const handleSearchButton = () => {
    handleOpen()
  }

  return (
    <Container colors={['#cabca4', '#b7a584']} start={[1, 0.2]}>
      <Feather
        name="search"
        size={30}
        color="#efebe4"
        onPress={handleSearchButton}
      />
    </Container>
  )
}

export default SidebarMenu
