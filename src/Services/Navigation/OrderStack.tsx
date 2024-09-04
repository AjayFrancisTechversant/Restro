import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderScreen, {OrderType} from '../../Modules/OrderScreen';
import PaymentInfoScreen from '../../Modules/PaymentInfoScreen';
import SummaryScreen from '../../Modules/SummaryScreen';
import AddressScreen from '../../Modules/AddressScreen';
import VehicleScreen from '../../Modules/VehicleScreen';
import SuccessScreenCarryOut from '../../Modules/SuccessScreenCarryOut';
import SuccessScreenDelivery, {
  ProgressType,
} from '../../Modules/SuccessScreenDelivery';
import SuccessScreenDineIn from '../../Modules/SuccessScreenDineIn';
import TrackingScreen from '../../Modules/TrackingScreen';
import {SetStateType} from '../../Types/Types';

export type OrderStackParamsList = {
  OrderScreen: undefined;
  AddressScreen: undefined;
  VehicleScreen: undefined;
  PaymentInfoScreen: undefined;
  SummaryScreen: undefined;
  SuccessScreenDineIn: undefined;
  SuccessScreenCarryOut: undefined;
  SuccessScreenDelivery: undefined;
  TrackingScreen: {setProgress: SetStateType<ProgressType>; order: OrderType};
};
const Stack = createNativeStackNavigator<OrderStackParamsList>();

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{headerShown: false}}>
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

export default OrderStack;
