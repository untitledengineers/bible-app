import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import './src/utils/ignoreWarnings'
import './src/styles/unistyle'

import App from './src'
import AppProviders from './src/context'

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <App />
      </AppProviders>
    </GestureHandlerRootView>
  )
}

export default Main
