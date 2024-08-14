import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Modules/HomeScreen';
import EditZipcodeScreen from '../../Modules/EditZipcodeScreen';
import HotelScreen from '../../Modules/HotelScreen';
import ProfileScreen from '../../Modules/ProfileScreen';
import MenuScreen from '../../Modules/MenuScreen';
import FoodItemScreen from '../../Modules/FoodItemScreen';
import OrderScreen from '../../Modules/OrderScreen';
import PaymentInfoScreen from '../../Modules/PaymentInfoScreen';
import SummaryScreen from '../../Modules/SummaryScreen';
import AddressScreen from '../../Modules/AddressScreen';
import VehicleScreen from '../../Modules/VehicleScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditZipcodeScreen" component={EditZipcodeScreen} />
      <Stack.Screen name="HotelScreen" component={HotelScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="FoodItemScreen" component={FoodItemScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
      <Stack.Screen name="PaymentInfoScreen" component={PaymentInfoScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
