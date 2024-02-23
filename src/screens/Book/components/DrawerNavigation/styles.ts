import styled from 'styled-components/native'

export const Item = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
`

export const ItemContent = styled.Text`
  font-size: 16px;
  font-family: 'Cardo_700Bold';
  color: ${({ theme }) => theme.colors.primary};
`

export const ItemSeparator = styled.Text`
  font-size: 12px;
  text-align: center;
  font-family: 'Cardo_400Regular';
  color: ${({ theme }) => theme.colors.primary};
`
