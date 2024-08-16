import {View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {HotelType} from '../../Components/HotelsContainer';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {Chip} from 'react-native-paper';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';
import {ReviewType} from '../ReviewsScreen';
import MyTextInput from '../../Components/MyTextInput';
import validate from '../../Validation/Validation';
import styles from './style';

type ErrorType = {
  nameError: boolean;
  commentError: boolean;
  ratingError: boolean;
};

const AddReviewScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  const hotel: HotelType = route.params.hotel;
  const [newReview, setNewReview] = useState<ReviewType>({
    name: StaticVariables.EMPTY_STRING,
    comment: StaticVariables.EMPTY_STRING,
    rating: StaticVariables.EMPTY_STRING,
    hotelId: hotel.id,
  });
  const [error, setError] = useState<ErrorType>({
    commentError: true,
    nameError: true,
    ratingError: true,
  });
  const HandleOnChangeText = (
    text: string,
    name: 'rating' | 'name' | 'comment',
  ) => {
    switch (name) {
      case 'name':
        setNewReview({...newReview, name: text});
        setError({...error, nameError: !validate(text)});
        break;
      case 'rating':
        setNewReview({...newReview, rating: text});
        setError({...error, ratingError: !validate(text, 'rating')});
        break;
      case 'comment':
        setNewReview({...newReview, comment: text});
        setError({...error, commentError: !validate(text)});
        break;
      default:
        break;
    }
  };
  const handleSubmitReview = (newReview: ReviewType) => {
    firestore()
      .collection('reviews')
      .add(newReview)
      .then(() => navigation.goBack());
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
<KeyboardAvoidingView behavior='position'>
      <ScrollView>
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
                    <Entypo name="location-pin" color={ColorPalette.gray} size={20} />
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
                </View>
                <MyTextInput
                  label="Name"
                  style={screenStyles.textInput}
                  value={newReview.name}
                  onChangeText={text => HandleOnChangeText(text, 'name')}
                />
                <MyTextInput
                  errorText={
                    error.ratingError && newReview.rating
                      ? '*Must be between 1 to 5'
                      : undefined
                  }
                  keyboardType="numeric"
                  label="Rating"
                  style={screenStyles.textInput}
                  value={newReview.rating}
                  onChangeText={text => HandleOnChangeText(text, 'rating')}
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
                    !error.nameError && !error.commentError && !error.ratingError
                      ? false
                      : true
                  }
                  style={[
                    screenStyles.bottomButton,
                    {
                      backgroundColor:
                        !error.commentError && !error.nameError && !error.ratingError
                          ? ColorPalette.red
                          : ColorPalette.lightRed,
                    },
                  ]}
                  onPress={() => {
                    handleSubmitReview(newReview);
                  }}>
                  <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                    Submit Review
                  </Text>
                </MyButton>
              </View>
            </>
      </ScrollView>
</KeyboardAvoidingView>
  );
};

export default AddReviewScreen;
