import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {HotelType} from '../HotelsContainer';
import styles from './style';

type HotelCardPropsType = {
  hotel: HotelType;
};

const HotelCard: React.FC<HotelCardPropsType> = ({hotel}) => {
  const navigation = useNavigation();
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
      onPress={() => navigation.navigate('HotelScreen' as never)}
      style={screenStyles.card}>
      <Image
        style={screenStyles.imageStyle}
        source={{
          uri: hotel.image,
        }}
      />
      <View style={screenStyles.hotelDetailsContainer}>
        <TouchableOpacity
          onPress={() => setIsBookmarked(!isBookmarked)}
          style={screenStyles.bookmarkButton}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={ColorPalette.red}
          />
        </TouchableOpacity>
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
