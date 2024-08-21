import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import {Chip} from 'react-native-paper';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HeaderComponent from '../../Components/HeaderComponent';
import StaticVariables from '../../Preferences/StaticVariables';
import ReviewCard from '../../Components/ReviewCard';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';

export type ReviewType = {
  name: string;
  comment: string;
  hotelId: string;
  rating: string;
};

type ReviewsScreenPropsType = NativeStackScreenProps<
  HomeStackParamsList,
  'ReviewsScreen'
>;

const ReviewsScreen: FC<ReviewsScreenPropsType> = ({route}) => {
  const navigation: any = useNavigation();
  const {hotel} = route.params;
  const [reviews, setReviews] = useState<ReviewType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    const subscriber = firestore()
      .collection('reviews')
      .where('hotelId', '==', hotel.id)
      .onSnapshot(querrySnapshot => {
        setReviews(querrySnapshot.docs.map((i: any) => i.data()));
      });

    return () => subscriber();
  }, []);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Image
            style={screenStyles.bgImage}
            blurRadius={5}
            source={{
              uri: hotel.image,
            }}
          />
          <View style={screenStyles.container}>
            <HeaderComponent color={ColorPalette.white} />
            <View style={screenStyles.hotelDetailscontainer}>
              <Text style={commonStyles.bigBoldText}>{hotel.name}</Text>
              <Text>
                <Entypo
                  name="location-pin"
                  color={ColorPalette.gray}
                  size={20}
                />
                {hotel.location}
              </Text>
              <View style={screenStyles.chipsContainer}>
                {hotel.preferences.map((preference, index) => (
                  <Chip key={index} icon="check" disabled>
                    {preference}
                  </Chip>
                ))}
              </View>
              <TouchableOpacity style={screenStyles.ratingsContainerButton}>
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome
                  name="star-half-empty"
                  color={ColorPalette.red}
                  size={20}
                />
                <Text> {hotel.rating}</Text>
              </TouchableOpacity>
              <View style={screenStyles.reservationContainer}>
                <Text style={commonStyles.redText}>
                  <Entypo name="plus" size={20} /> Make a reservation
                </Text>
                <MyButton style={screenStyles.contactButton}>
                  <Text style={commonStyles.redText}>Contact</Text>
                </MyButton>
              </View>
            </View>
            <View style={screenStyles.navigationButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={commonStyles.boldText}>
                  <AntDesign name="arrowleft" size={20} /> Reviews
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(StaticVariables.AddReviewScreen, {hotel})
                }>
                <Text style={[commonStyles.redText, commonStyles.boldText]}>
                  <AntDesign name="plus" size={20} /> Add your review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
      ListEmptyComponent={
        <ActivityIndicator size={50} color={ColorPalette.gray} />
      }
      data={reviews}
      renderItem={({item}) => <ReviewCard review={item} />}
    />
  );
};

export default ReviewsScreen;
