import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Animated } from 'react-native'

import {
  Container,
  BackButton,
  AnimatedTitle,
  FontScaleWrapper,
  FontScaleButton
} from './styles'
import { useFont } from '../../context/font'
import { useTheme } from '../../context/theme'

type Props = {
  title?: string
  titleOpacity?: number | Animated.AnimatedInterpolation<string | number>
}

const ICON_SIZE = 26

const Header = ({ title, titleOpacity = 1 }: Props) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()
  const { increaseFontScale, decreaseFontScale } = useFont()

  return (
    <Container>
      <BackButton onPress={goBack}>
        <AntDesign
          name="arrowleft"
          size={ICON_SIZE}
          color={theme.colors.primary}
        />
      </BackButton>

      {!!title && (
        <AnimatedTitle
          style={{
            opacity: titleOpacity,
            fontSize: title.length > 20 ? 18 : 22
          }}
        >
          {title}
        </AnimatedTitle>
      )}

      <FontScaleWrapper>
        <FontScaleButton onPress={decreaseFontScale}>
          <MaterialIcons
            name="text-decrease"
            size={ICON_SIZE}
            color={theme.colors.primary}
          />
        </FontScaleButton>
        <FontScaleButton onPress={increaseFontScale}>
          <MaterialIcons
            name="text-increase"
            size={ICON_SIZE}
            color={theme.colors.primary}
          />
        </FontScaleButton>
      </FontScaleWrapper>
    </Container>
  )
}

export default Header
