import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  Cardo_400Regular,
  Cardo_400Regular_Italic,
  Cardo_700Bold
} from '@expo-google-fonts/cardo'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'

import { useTheme } from './context/theme'
import { useFont } from './context/font'

import { setNavigator } from './utils/navigation'

import Navigation from './Navigation'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const { setTheme } = useTheme()
  const { setFontScale } = useFont()

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Cardo_400Regular,
          Cardo_400Regular_Italic,
          Cardo_700Bold
        })

        const theme = await AsyncStorage.getItem('@theme')
        if (theme) {
          setTheme(JSON.parse(theme))
        }

        const fontScale = await AsyncStorage.getItem('@fontScale')
        if (fontScale) {
          setFontScale(Number(fontScale))
        }

        const hasOnboarded = await AsyncStorage.getItem('@hasOnboarded')
        setHasOnboarded(!!hasOnboarded)
      } catch (e) {
        console.error(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [setFontScale, setTheme])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <NavigationContainer ref={setNavigator} onReady={onLayoutRootView}>
      <Navigation hasOnboarded={hasOnboarded} />
    </NavigationContainer>
  )
}

export default App
