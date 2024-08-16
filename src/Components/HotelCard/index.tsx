import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {HotelType} from '../HotelsContainer';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

type HotelCardPropsType = {
  hotel: HotelType;
};

const HotelCard: React.FC<HotelCardPropsType> = ({hotel}) => {
  const navigation: any = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);
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
      <Image
        style={screenStyles.imageStyle}
        source={{
          uri: hotel.image,
        }}
      />
      <View style={screenStyles.hotelDetailsContainer}>
        <Text style={commonStyles.bigBoldText}>{hotel.name}</Text>
        <Text>
          <Entypo name="location-pin" color={ColorPalette.gray} size={20} />
          {hotel.location}
        </Text>
        <Text style={screenStyles.ratingText}>
          <AntDesign name="star" color={ColorPalette.gold} size={20} />
          {hotel.rating}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;
