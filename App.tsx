import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'

import './src/utils/ignoreWarnings'

import App from './src'

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  )
}

export default Main
