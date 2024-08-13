import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {FoodType} from '../FeaturedItemsComponent';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import StaticVariables from '../../Preferences/StaticVariables';
import {HotelType} from '../HotelsContainer';

type FoodItemCardPropsType = {
  food: FoodType;
  hotel: HotelType;
};
const FoodItemCard: React.FC<FoodItemCardPropsType> = ({food, hotel}) => {
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(StaticVariables.FoodItemScreen, {hotel, food});
      }}
      style={screenStyles.card}>
      <Image
        style={screenStyles.imageStyle}
        source={{
          uri: food.image,
        }}
      />
      <View style={screenStyles.hotelDetailsContainer}>
        <Text style={commonStyles.bigBoldText}>{food.name}</Text>
        <Text>{food.desc}</Text>
        <Text style={[commonStyles.redText, commonStyles.boldText]}>
          {food.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;
