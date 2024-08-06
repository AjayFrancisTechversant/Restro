import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import {NavigationContainer} from '@react-navigation/native';
import UnauthorizedStack from './src/Services/Navigation/UnauthorizedStack';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/Store/Store';
import {Provider} from 'react-redux';

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <App />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </ScreenContextProvider>
  );
};

export default Main;
