import styled from 'styled-components/native'

export const Image = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 98%;
`

export const NotShowAgainWrapper = styled.View`
  position: absolute;
  bottom: 80px;
  align-self: center;
  flex-direction: row;
`

export const NotShowAgainText = styled.Text`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.primary};
`
