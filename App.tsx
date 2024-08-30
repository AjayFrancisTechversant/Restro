import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {PaperProvider} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import InitializingScreen from './src/Components/InitializingScreen';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import UnauthorizedStack from './src/Services/Navigation/UnauthorizedStack';
import AuthorizedStack from './src/Services/Navigation/AuthorizedStack';
import {persistor, store} from './src/Redux/Store/Store';

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber1 = auth().onAuthStateChanged(onAuthStateChanged);
    const subscriber2 = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet!',
          'Uh Oh!. Looks like theres no internet connection.',
          [
            {
              text: 'Exit',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      }
    });
    return () => {
      subscriber1;
      subscriber2;
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!initializing ? (
        <NavigationContainer>
          {!user ? <UnauthorizedStack /> : <AuthorizedStack />}
        </NavigationContainer>
      ) : (
        <InitializingScreen />
      )}
      <FlashMessage position="top" />
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
