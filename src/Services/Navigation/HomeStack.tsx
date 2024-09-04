import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Modules/HomeScreen';
import EditZipcodeScreen from '../../Modules/EditZipcodeScreen';
import HotelScreen from '../../Modules/HotelScreen';
import ProfileScreen from '../../Modules/ProfileScreen';
import MenuScreen from '../../Modules/MenuScreen';
import FoodItemScreen from '../../Modules/FoodItemScreen';
import ReviewsScreen from '../../Modules/ReviewsScreen';
import AddReviewScreen from '../../Modules/AddReviewScreen';
import {HotelType} from '../../Components/HotelsContainer';
import {FoodType} from '../../Components/FeaturedItemsComponent';

export type HomeStackParamsList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditZipcodeScreen: undefined;
  HotelScreen: {hotel: HotelType};
  ReviewsScreen: {hotel: HotelType};
  AddReviewScreen: {hotel: HotelType};
  MenuScreen: {hotel: HotelType};
  FoodItemScreen: {hotel: HotelType; food: FoodType};
};
const Stack = createNativeStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditZipcodeScreen" component={EditZipcodeScreen} />
      <Stack.Screen name="HotelScreen" component={HotelScreen} />
      <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
      <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="FoodItemScreen" component={FoodItemScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
