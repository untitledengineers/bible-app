import React from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from '../../context/theme'

import {
  Container,
  BackButton,
  AnimatedTitle,
  FontScaleWrapper,
  FontScaleButton
} from './styles'
import { useFont } from '../../context/font'

type Props = {
  title?: string
  titleOpacity?: number | Animated.AnimatedInterpolation<string | number>
}

const Header = ({ title, titleOpacity = 1 }: Props) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()
  const { increaseFontScale, decreaseFontScale } = useFont()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.primary} />
      </BackButton>

      {!!title && (
        <AnimatedTitle
          style={{
            opacity: titleOpacity
          }}
        >
          {title}
        </AnimatedTitle>
      )}

      <FontScaleWrapper>
        <FontScaleButton onPress={decreaseFontScale}>
          <MaterialCommunityIcons
            name="format-font-size-decrease"
            size={24}
            color={theme.colors.primary}
          />
        </FontScaleButton>
        <FontScaleButton onPress={increaseFontScale}>
          <MaterialCommunityIcons
            name="format-font-size-increase"
            size={24}
            color={theme.colors.primary}
          />
        </FontScaleButton>
      </FontScaleWrapper>
    </Container>
  )
}

export default Header
