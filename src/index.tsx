import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Cardo_400Regular,
  Cardo_400Regular_Italic,
  Cardo_700Bold,
} from '@expo-google-fonts/cardo';

import { LoadingProvider } from './context/loading';
import { SearchProvider } from './context/search';

import Navigation from './Navigation';

const App = () => {
  const [fontsLoaded] = useFonts({
    Cardo_400Regular,
    Cardo_400Regular_Italic,
    Cardo_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <LoadingProvider>
        <SearchProvider>
          <Navigation />
        </SearchProvider>
      </LoadingProvider>
    </NavigationContainer>
  );
};

export default App;
