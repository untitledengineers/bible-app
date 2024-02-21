import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home'
import Book from './screens/Book'
import Onboarding from './screens/Onboarding'

const AppStack = createStackNavigator()

type NavigationProps = {
  hasOnboarded: boolean
}

const Navigation = ({ hasOnboarded }: NavigationProps) => {
  return (
    <AppStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: '#efebe4' }
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
