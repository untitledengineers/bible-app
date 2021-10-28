import { Animated } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled(Animated.View)`
  flex: 1;
  flex-direction: row;
`

export const List = styled(ScrollView)`
  margin-left: 40px;
  background-color: rgba(0, 0, 0, 0.1);
`

export const Item = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
`

export const ItemContent = styled.Text`
  font-size: 28px;
  font-family: 'Cardo_400Regular_Italic';
  color: #3d3424;
`
