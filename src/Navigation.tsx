import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { useTheme } from './context/theme'
import Book from './screens/Book'
import Home from './screens/Home'
import Onboarding from './screens/Onboarding'

const AppStack = createStackNavigator()

type NavigationProps = {
  hasOnboarded: boolean
}

const Navigation = ({ hasOnboarded }: NavigationProps) => {
  const { theme } = useTheme()

  return (
    <AppStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.colors.background },
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
