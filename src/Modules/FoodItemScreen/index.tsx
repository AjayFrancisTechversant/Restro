import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {HotelType} from '../../Components/HotelsContainer';
import {FoodType} from '../../Components/FeaturedItemsComponent';
import styles from './style';

const FoodItemScreen = ({route}: any) => {
  const hotel: HotelType = route.params.hotel;
  const food: FoodType = route.params.food;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <View style={screenStyles.container}>
      <Text>FoodItemScreen</Text>
    </View>
  );
};

export default FoodItemScreen;
