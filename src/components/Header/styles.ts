import { Animated } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 40px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-color: #efebe4;
`

export const Button = styled(BorderlessButton)`
  position: absolute;
  left: 16px;
`

export const AnimatedTitle = styled(Animated.Text)`
  color: #3d3424;
  font-size: 20px;
  font-family: 'Cardo_700Bold';
`
