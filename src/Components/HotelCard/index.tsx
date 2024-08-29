import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  arrayRemove,
  arrayUnion,
} from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
  bookmarkedHotelIds: string[];
};

const HotelCard: React.FC<HotelCardPropsType> = ({
  hotel,
  bookmarkedHotelIds,
}) => {
  const navigation: any = useNavigation();
  const currentUserId = auth().currentUser?.uid;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const isBookmarked = bookmarkedHotelIds.find(i => i == hotel.id);

  const handleBookmark = async () => {
    setIsBookmarkLoading(true);
    try {
      if (!isBookmarked) {
        //add
        const isDocExisting = (
          await firestore().collection('bookmarks').doc(currentUserId).get()
        ).exists;
        if (!isDocExisting) {
          //create a new array
          await firestore()
            .collection('bookmarks')
            .doc(currentUserId)
            .set({bookmarkedHotelIds: arrayUnion(hotel.id)});
        } else {
          //push into array
          await firestore()
            .collection('bookmarks')
            .doc(currentUserId)
            .update({bookmarkedHotelIds: arrayUnion(hotel.id)});
        }
      } else {
        // remove
        await firestore()
          .collection('bookmarks')
          .doc(currentUserId)
          .update({bookmarkedHotelIds: arrayRemove(hotel.id)});
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

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
      disabled={isBookmarkLoading}
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
      {!isBookmarkLoading ? (
        <TouchableOpacity
          onPress={handleBookmark}
          style={screenStyles.bookmarkButtonStyle}>
          <Fontisto
            color={ColorPalette.red}
            size={30}
            name={isBookmarked ? 'bookmark-alt' : 'bookmark'}
          />
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          style={screenStyles.bookmarkButtonStyle}
          size={20}
          color={ColorPalette.red}
        />
      )}
    </TouchableOpacity>
  );
};

export default HotelCard;
