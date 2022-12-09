import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import {
  Cardo_400Regular,
  Cardo_400Regular_Italic,
  Cardo_700Bold
} from '@expo-google-fonts/cardo'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'

import { LoadingProvider } from './context/loading'
import { SearchProvider } from './context/search'

import { setNavigator } from './utils/navigation'

import Navigation from './Navigation'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [hasOnboarded, setHasOnboarded] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Cardo_400Regular,
          Cardo_400Regular_Italic,
          Cardo_700Bold
        })

        const value = await AsyncStorage.getItem('@hasOnboarded')

        setHasOnboarded(!!value)
      } catch (e) {
        console.error(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <LoadingProvider>
      <SearchProvider>
        <NavigationContainer ref={setNavigator} onReady={onLayoutRootView}>
          <StatusBar style="dark" />
          <Navigation hasOnboarded={hasOnboarded} />
        </NavigationContainer>
      </SearchProvider>
    </LoadingProvider>
  )
}

export default App
