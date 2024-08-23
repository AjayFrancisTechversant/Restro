import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {FoodType} from '../FeaturedItemsComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import StaticVariables from '../../Preferences/StaticVariables';
import {HotelType} from '../HotelsContainer';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type FoodItemCardPropsType = {
  food: FoodType;
  hotel: HotelType;
};
const FoodItemCard: React.FC<FoodItemCardPropsType> = ({food, hotel}) => {
  const navigation: any = useNavigation();
  const [isImageLoading, setIsImageLoading] = useState(true);
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
      <View>
        <Image
          style={screenStyles.imageStyle}
          source={{
            uri: food.image,
          }}
          onLoadEnd={() => setIsImageLoading(false)}
        />
        {isImageLoading && (
          <ActivityIndicator
            size={40}
            color={ColorPalette.red}
            style={screenStyles.imageLoadingindicator}
          />
        )}
      </View>
      <View style={screenStyles.hotelDetailsContainer}>
        <Text style={commonStyles.bigBoldText}>{food.name}</Text>
        <Text>{food.desc}</Text>
        <Text style={[commonStyles.redText, commonStyles.boldText]}>
          $ {food.price ? food.price : 'Varies Acoording to Protein'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;
