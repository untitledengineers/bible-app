/* eslint-disable global-require */
import React from 'react'
import LottieView from 'lottie-react-native'

import { Container } from './styles'

const Loading = () => {
  return (
    <Container>
      <LottieView
        source={require('../../data/book-loading-light.json')}
        autoPlay
        loop
      />
    </Container>
  )
}

export default Loading
