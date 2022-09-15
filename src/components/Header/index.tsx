import React from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import { Container, Button, AnimatedTitle } from './styles'

type Props = {
  title?: string
  titleOpacity?: number | Animated.AnimatedInterpolation
}

const Header = ({ title, titleOpacity = 1 }: Props) => {
  const { goBack } = useNavigation()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <Container>
      <Button onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color="#3d3424" />
      </Button>

      {!!title && (
        <AnimatedTitle
          style={{
            opacity: titleOpacity
          }}
        >
          {title}
        </AnimatedTitle>
      )}
    </Container>
  )
}

export default Header
