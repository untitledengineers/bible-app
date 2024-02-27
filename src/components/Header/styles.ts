import { Animated } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const HEADER_HEIGHT = 56

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: ${HEADER_HEIGHT}px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-color: ${({ theme }) => theme.colors.background};
`

export const BackButton = styled(BorderlessButton)`
  position: absolute;
  left: 16px;
`

export const AnimatedTitle = styled(Animated.Text)`
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Cardo_700Bold';
`

export const FontScaleWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  right: 16px;
`

export const FontScaleButton = styled(BorderlessButton)`
  margin-left: 16px;
`
