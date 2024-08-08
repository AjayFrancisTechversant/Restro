import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Modules/HomeScreen';
import EditZipcodeScreen from '../../Modules/EditZipcodeScreen';
import HotelScreen from '../../Modules/HotelScreen';

const Stack = createNativeStackNavigator();

const AuthorizedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EditZipcodeScreen" component={EditZipcodeScreen} />
      <Stack.Screen name="HotelScreen" component={HotelScreen} />
    </Stack.Navigator>
  );
};

export default AuthorizedStack;
