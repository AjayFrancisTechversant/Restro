import firestore from '@react-native-firebase/firestore';
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import AddReviewComponent, {NewReviewType} from '../AddReviewComponent';
import MyButton from '../MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';
import StaticVariables from '../../Preferences/StaticVariables';

type ReviewType = {
  name: string;
  comment: string;
  hotelId: string;
  rating: string;
};
type ReviewsComponentPropsType = {
  setGoToReviewComponent: SetStateType<boolean>;
  passedHotelId: string;
};

const ReviewsComponent: React.FC<ReviewsComponentPropsType> = ({
  setGoToReviewComponent,
  passedHotelId,
}) => {
  const [isAddingReview, setIsAddingReview] = useState(false);
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
  const handleSubmitReview = (newReview: NewReviewType) => {
    firestore()
      .collection('reviews')
      .add(newReview)
      .then(() => setIsAddingReview(false));
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  const fetchReviews = () => {
    firestore()
      .collection('reviews')
      // Filter results
      .where('hotelId', '==', passedHotelId)
      .get()
      .then(querySnapshot => {
        setReviews(querySnapshot.docs.map((i: any) => i.data()));
      });
  };
  console.log(reviews);
  
  return (
    <View style={screenStyles.container}>
      {!isAddingReview ? (
        <>
          <View style={screenStyles.header}>
            <TouchableOpacity onPress={() => setGoToReviewComponent(false)}>
              <Text style={commonStyles.boldText}>
                <AntDesign name="arrowleft" size={20} /> Reviews
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsAddingReview(true)}
              style={screenStyles.addReviewButton}>
              <Text style={[commonStyles.redText, commonStyles.boldText]}>
                <AntDesign name="plus" size={20} /> Add your review
              </Text>
            </TouchableOpacity>
          </View>
          <MyButton
            style={[
              screenStyles.bottomButton,
              {backgroundColor: ColorPalette.red},
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              View Menu
            </Text>
          </MyButton>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setIsAddingReview(false)}>
            <Text style={commonStyles.boldText}>
              <AntDesign name="arrowleft" size={20} /> Add your Review
            </Text>
          </TouchableOpacity>
          <AddReviewComponent
            passedHotelId={passedHotelId}
            handleSubmitReview={handleSubmitReview}
          />
        </>
      )}
    </View>
  );
};

export default ReviewsComponent;
