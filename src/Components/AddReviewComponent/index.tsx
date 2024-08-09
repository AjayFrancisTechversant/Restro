import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../MyTextInput';
import validate from '../../Validation/Validation';
import StaticVariables from '../../Preferences/StaticVariables';
import MyButton from '../MyButton';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type ErrorType = {
  nameError: boolean;
  commentError: boolean;
  ratingError: boolean;
};
export type NewReviewType = {
  name: string;
  comment: string;
  rating: string;
  hotelId: string;
};
type AddReviewComponentPropsType = {
  handleSubmitReview: (newReview: NewReviewType) => void;
  passedHotelId: string;
};
const AddReviewComponent: React.FC<AddReviewComponentPropsType> = ({
  handleSubmitReview,
  passedHotelId,
}) => {
  const [newReview, setNewReview] = useState<NewReviewType>({
    name: StaticVariables.EMPTY_STRING,
    comment: StaticVariables.EMPTY_STRING,
    rating: StaticVariables.EMPTY_STRING,
    hotelId: passedHotelId,
  });
  const [error, setError] = useState<ErrorType>({
    commentError: true,
    nameError: true,
    ratingError: true,
  });

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
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

  return (
    <>
      <View style={screenStyles.container}>
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
      </View>
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
    </>
  );
};

export default AddReviewComponent;
