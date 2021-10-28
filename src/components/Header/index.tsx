import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import { Container, Button } from './styles'

const Header = () => {
  const { goBack } = useNavigation()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <Container>
      <Button onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color="#3d3424" />
      </Button>
    </Container>
  )
}

export default Header
