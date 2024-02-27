import React from 'react'

import { Container, Separator, Text } from './styles'

type ListHeaderProps = {
  text: string
}

const ListHeader = ({ text }: ListHeaderProps) => {
  return (
    <Container>
      <Separator />

      <Text>{text}</Text>

      <Separator />
    </Container>
  )
}

export default ListHeader
