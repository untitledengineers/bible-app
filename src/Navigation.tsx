import React from 'react'
import { useWindowDimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home'
import Book from './screens/Book'
import Onboarding from './screens/Onboarding'

import DrawerNavigation from './components/DrawerNavigation'

const AppStack = createStackNavigator()

const HomeRoutes = () => (
  <AppStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { backgroundColor: '#efebe4' }
    }}
  >
    <AppStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <AppStack.Screen name="Book" component={Book} />
  </AppStack.Navigator>
)

const AppDrawer = createDrawerNavigator()

type NavigationProps = {
  hasOnboarded: string | null
}

const Navigation = ({ hasOnboarded }: NavigationProps) => {
  const window = useWindowDimensions()

  return (
    <AppDrawer.Navigator
      drawerStyle={{ width: 64 }}
      drawerType="slide"
      overlayColor="rgba(0,0,0,0.5)"
      drawerContent={props => <DrawerNavigation {...props} />}
      edgeWidth={window.width}
      initialRouteName={hasOnboarded ? 'Home' : 'Onboarding'}
    >
      <AppDrawer.Screen name="Home" component={HomeRoutes} />
      <AppDrawer.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          gestureEnabled: false
        }}
      />
    </AppDrawer.Navigator>
  )
}

export default Navigation
