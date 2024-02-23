import React from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import { useTheme } from '../../context/theme'

import { Container, Button, AnimatedTitle } from './styles'

type Props = {
  title?: string
  titleOpacity?: number | Animated.AnimatedInterpolation<string | number>
}

const Header = ({ title, titleOpacity = 1 }: Props) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <Container>
      <Button onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.primary} />
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
