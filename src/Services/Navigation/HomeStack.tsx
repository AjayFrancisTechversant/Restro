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
import SuccessScreenCarryOut from '../../Modules/SuccessScreenCarryOut';
import SuccessScreenDelivery from '../../Modules/SuccessScreenDelivery';
import SuccessScreenDineIn from '../../Modules/SuccessScreenDineIn';
import TrackingScreen from '../../Modules/TrackingScreen';
import ReviewsScreen from '../../Modules/ReviewsScreen';
import AddReviewScreen from '../../Modules/AddReviewScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditZipcodeScreen" component={EditZipcodeScreen} />
      <Stack.Screen name="HotelScreen" component={HotelScreen} />
      <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="FoodItemScreen" component={FoodItemScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
      <Stack.Screen name="PaymentInfoScreen" component={PaymentInfoScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      <Stack.Screen
        name="SuccessScreenDineIn"
        component={SuccessScreenDineIn}
      />
      <Stack.Screen
        name="SuccessScreenCarryOut"
        component={SuccessScreenCarryOut}
      />
      <Stack.Screen
        name="SuccessScreenDelivery"
        component={SuccessScreenDelivery}
      />
      <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
