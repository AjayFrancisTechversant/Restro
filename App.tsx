import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import {NavigationContainer} from '@react-navigation/native';
import UnauthorizedStack from './src/Services/Navigation/UnauthorizedStack';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <UnauthorizedStack />
        {/* authorised Stack */}
      </NavigationContainer>
    </SafeAreaView>
  );
}
const Main = () => {
  return (
    <ScreenContextProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ScreenContextProvider>
  );
};

export default Main;
