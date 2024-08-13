import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {FoodType} from '../FeaturedItemsComponent';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';

type FoodItemCardPropsType = {
  food: FoodType;
};
const FoodItemCard: React.FC<FoodItemCardPropsType> = ({food}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <TouchableOpacity onPress={() => {}} style={screenStyles.card}>
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
