import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useStyles } from 'react-native-unistyles'

import Book from './screens/Book'
import Home from './screens/Home'
import Onboarding from './screens/Onboarding'

const AppStack = createNativeStackNavigator()

type NavigationProps = {
  hasOnboarded: boolean
}

const Navigation = ({ hasOnboarded }: NavigationProps) => {
  const { theme } = useStyles()

  return (
    <AppStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.background },
        headerShown: false
      }}
      initialRouteName={hasOnboarded ? 'Home' : 'Onboarding'}
    >
      <AppStack.Screen name="Onboarding" component={Onboarding} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Book" component={Book} />
    </AppStack.Navigator>
  )
}

export default Navigation
