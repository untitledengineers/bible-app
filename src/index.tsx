import {
  Cardo_400Regular,
  Cardo_400Regular_Italic,
  Cardo_700Bold
} from '@expo-google-fonts/cardo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { UnistylesRuntime } from 'react-native-unistyles'

import Navigation from './Navigation'
import { useFont } from './context/font'
import { ThemeType } from './styles'
import { setNavigator } from './utils/navigation'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const { setFontScale } = useFont()

  const getFont = useCallback(async () => {
    try {
      await Font.loadAsync({
        Cardo_400Regular,
        Cardo_400Regular_Italic,
        Cardo_700Bold
      })

      const fontScale = await AsyncStorage.getItem('@fontScale')
      if (fontScale) {
        setFontScale(Number(fontScale))
      }
    } catch (error) {
      console.error('Error loading font', error)
    }
  }, [setFontScale])

  const getOnboarded = useCallback(async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem('@hasOnboarded')
      if (hasOnboarded) {
        setHasOnboarded(true)
      }
    } catch (error) {
      console.error('Error loading onboarded', error)
    }
  }, [])

  const getTheme = useCallback(async () => {
    try {
      const theme = await AsyncStorage.getItem('@theme')
      if (theme) {
        UnistylesRuntime.setTheme(theme as ThemeType)
      }
    } catch (error) {
      console.error('Error loading theme', error)
    }
  }, [])

  useEffect(() => {
    async function prepare() {
      await getFont()
      await getOnboarded()
      await getTheme()

      setAppIsReady(true)
    }

    prepare()
  }, [getFont, getOnboarded, getTheme, setFontScale])

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
      <StatusBar
        style={UnistylesRuntime.themeName === ThemeType.dark ? 'light' : 'dark'}
      />
      <Navigation hasOnboarded={hasOnboarded} />
    </NavigationContainer>
  )
}

export default App
