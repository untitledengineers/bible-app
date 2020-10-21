import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  height: 40px;
  padding-left: 16px;

  position: absolute;
  top: 0px;
  left: 0;
  right: 0;

  background-color: #efebe4;
`;

export const Button = styled(BorderlessButton)`
  width: 24px;
`;
