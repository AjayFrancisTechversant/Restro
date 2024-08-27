import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating-widget';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {Chip} from 'react-native-paper';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';
import {ReviewType} from '../ReviewsScreen';
import MyTextInput from '../../Components/MyTextInput';
import validate from '../../Validation/Validation';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';
import ReviewsAvgComponent from '../../Components/ReviewsAvgComponent';
import styles from './style';

type ErrorType = {
  nameError: boolean;
  commentError: boolean;
  ratingError: boolean;
};
type AddReviewScreenPropsType = NativeStackScreenProps<
  HomeStackParamsList,
  'AddReviewScreen'
>;

const AddReviewScreen: FC<AddReviewScreenPropsType> = ({route}) => {
  const navigation: any = useNavigation();
  const {hotel} = route.params;
  const [newReview, setNewReview] = useState<ReviewType>({
    name: StaticVariables.EMPTY_STRING,
    comment: StaticVariables.EMPTY_STRING,
    rating: 0,
    hotelId: hotel.id,
  });
  const [error, setError] = useState<ErrorType>({
    commentError: true,
    nameError: true,
    ratingError: true,
  });
  const [isSubmittingLoading, setIsSubmittingLoading] = useState(false);
  const HandleOnChangeText = (text: string, name: 'name' | 'comment') => {
    switch (name) {
      case 'name':
        setNewReview({...newReview, name: text});
        setError({...error, nameError: !validate(text)});
        break;
      case 'comment':
        setNewReview({...newReview, comment: text});
        setError({...error, commentError: !validate(text)});
        break;
      default:
        break;
    }
  };
  const onRatingChange = (rating: number) => {
    setNewReview({...newReview, rating});
    if (rating == 0) {
      setError({...error, ratingError: true});
    } else setError({...error, ratingError: false});
  };

  const handleSubmitReview = (newReview: ReviewType) => {
    setIsSubmittingLoading(true);
    firestore()
      .collection('reviews')
      .add(newReview)
      .then(() => navigation.goBack())
      .finally(() => setIsSubmittingLoading(false));
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
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <ReviewsAvgComponent hotelId={hotel.id} />
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
            </View>
            <View style={screenStyles.addRatingContainer}>
              <StarRating
                rating={newReview.rating}
                onChange={onRatingChange}
                color={ColorPalette.red}
                starSize={50}
              />
              <Text style={screenStyles.ratingText}>
                {newReview.rating
                  ? newReview.rating
                  : 'Please provide your rating!'}
              </Text>
            </View>
            <MyTextInput
              label="Name"
              style={screenStyles.textInput}
              value={newReview.name}
              onChangeText={text => HandleOnChangeText(text, 'name')}
            />
            <MyTextInput
              label="Comments"
              value={newReview.comment}
              onChangeText={text => HandleOnChangeText(text, 'comment')}
              multiline
              numberOfLines={3}
              style={screenStyles.textInput}
            />
            <MyButton
              disabled={
                !error.nameError &&
                !error.commentError &&
                !error.ratingError &&
                !isSubmittingLoading
                  ? false
                  : true
              }
              style={[
                screenStyles.bottomButton,
                {
                  backgroundColor:
                    !error.commentError &&
                    !error.nameError &&
                    !error.ratingError
                      ? ColorPalette.red
                      : ColorPalette.lightRed,
                },
              ]}
              onPress={() => {
                handleSubmitReview(newReview);
              }}>
              {!isSubmittingLoading ? (
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Submit Review
                </Text>
              ) : (
                <ActivityIndicator color={ColorPalette.white} size={20} />
              )}
            </MyButton>
          </View>
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddReviewScreen;
