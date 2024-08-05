import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../Modules/WelcomeScreen';
import PreferenceScreen from '../../Modules/PreferenceScreen';
import RegisterScreen1 from '../../Modules/RegisterScreen1';
import RegisterScreen2 from '../../Modules/RegisterScreen2';
import SignInScreen from '../../Modules/SignInScreen';
import ForgotPasswordScreen from '../../Modules/ForgotPasswordScreen';
import ChangePasswordScreen from '../../Modules/ChangePasswordScreen';
import ChangePasswordSuccessScreen from '../../Modules/ChangePasswordSuccessScreen';

const Stack = createNativeStackNavigator();

const UnauthorizedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PreferenceScreen" component={PreferenceScreen} />
      <Stack.Screen name="RegisterScreen1" component={RegisterScreen1} />
      <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="ChangePasswordSuccessScreen"
        component={ChangePasswordSuccessScreen}
      />
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;
