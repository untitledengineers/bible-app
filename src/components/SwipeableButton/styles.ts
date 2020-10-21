import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
`;

export const ItemContent = styled.Text`
  font-size: 28px;
  font-family: 'Cardo_400Regular_Italic';
  color: #3d3424;
`;

export const ListContainer = styled(Animated.View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
`;
