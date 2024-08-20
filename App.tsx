import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {ScreenContextProvider} from './src/Contexts/ScreenContext';
import UnauthorizedStack from './src/Services/Navigation/UnauthorizedStack';
import AuthorizedStack from './src/Services/Navigation/AuthorizedStack';
import {persistor, store} from './src/Redux/Store/Store';
import ColorPalette from './src/Assets/Themes/ColorPalette';

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!initializing ? (
        <NavigationContainer>
          {!user ? <UnauthorizedStack /> : <AuthorizedStack />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator size={50} color={ColorPalette.red} />
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
