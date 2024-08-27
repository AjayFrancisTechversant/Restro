import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {HotelType} from '../HotelsContainer';
import StaticVariables from '../../Preferences/StaticVariables';
import ReviewsAvgComponent from '../ReviewsAvgComponent';
import styles from './style';

type HotelCardPropsType = {
  hotel: HotelType;
};

const HotelCard: React.FC<HotelCardPropsType> = ({hotel}) => {
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
      onPress={() => navigation.navigate(StaticVariables.HotelScreen, {hotel})}
      style={screenStyles.card}>
      <View>
        <Image
          style={screenStyles.imageStyle}
          source={{
            uri: hotel.image,
          }}
          onLoadEnd={() => setIsImageLoading(false)}
        />
        {isImageLoading && (
          <ActivityIndicator
            color={ColorPalette.red}
            size={40}
            style={screenStyles.imageLoadingindicator}
          />
        )}
      </View>
      <View style={screenStyles.hotelDetailsContainer}>
        <Text style={commonStyles.bigBoldText}>{hotel.name}</Text>
        <Text>
          <Entypo name="location-pin" color={ColorPalette.gray} size={20} />
          {hotel.location}
        </Text>
        <View style={screenStyles.ratingContainer}>
          <ReviewsAvgComponent inHotelCard hotelId={hotel.id} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;
