import { Animated } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
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

export const Content = styled.View`
  margin-left: 40px;
`

export const Button = styled(RectButton)`
  padding: 10px 0px;
  justify-content: center;
  background-color: #efebe4;
`

export const Title = styled.Text`
  font-size: 22px;
  margin-bottom: 4px;
  font-family: 'Cardo_700Bold';
  color: #3d3424;
`

export const Chapter = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ChapterText = styled.Text`
  font-size: 16px;
  font-family: 'Cardo_400Regular_Italic';
  color: #999;
`
