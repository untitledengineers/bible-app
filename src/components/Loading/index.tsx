/* eslint-disable global-require */
import LottieView from 'lottie-react-native'
import React from 'react'

import { Container } from './styles'

const Loading = () => {
  return (
    <Container>
      <LottieView
        source={require('../../data/book-loading-light.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
      />
    </Container>
  )
}

export default Loading
