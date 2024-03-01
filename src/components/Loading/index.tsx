/* eslint-disable global-require */
import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'

const Loading = () => {
  const { styles } = useStyles(stylesheet)

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../data/book-loading-light.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
      />
    </View>
  )
}

export default Loading
