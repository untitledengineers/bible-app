import styled, { css } from 'styled-components/native'

const Text = css`
  font-family: 'Cardo_400Regular';
  color: ${({ theme }) => theme.colors.primary};
`

export const VerseNumber = styled.Text`
  ${Text}
`

export const Verse = styled.Text`
  ${Text}
  flex-shrink: 1;
  margin: 2px 0px;
`
