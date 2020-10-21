import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Book from './screens/Book';

import DrawerNavigation from './components/DrawerNavigation';

const AppStack = createStackNavigator();

const HomeRoutes = () => (
  <AppStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { backgroundColor: '#efebe4' },
    }}
  >
    <AppStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <AppStack.Screen name="Book" component={Book} />
  </AppStack.Navigator>
);

const AppDrawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <AppDrawer.Navigator
      drawerStyle={{ width: 64 }}
      drawerType="slide"
      overlayColor="rgba(0,0,0,0.5)"
      drawerContent={props => <DrawerNavigation {...props} />}
    >
      <AppDrawer.Screen name="Home" component={HomeRoutes} />
    </AppDrawer.Navigator>
  );
};

export default Navigation;
