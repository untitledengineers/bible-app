import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFonts,
  Cardo_400Regular,
  Cardo_400Regular_Italic,
  Cardo_700Bold
} from '@expo-google-fonts/cardo'
import * as SplashScreen from 'expo-splash-screen'

import { LoadingProvider } from './context/loading'
import { SearchProvider } from './context/search'

import { setNavigator } from './utils/navigation'

import Navigation from './Navigation'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

const App = () => {
  const [fontsLoaded] = useFonts({
    Cardo_400Regular,
    Cardo_400Regular_Italic,
    Cardo_700Bold
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer ref={setNavigator} onReady={onLayoutRootView}>
      <LoadingProvider>
        <SearchProvider>
          <Navigation />
        </SearchProvider>
      </LoadingProvider>
    </NavigationContainer>
  )
}

export default App
