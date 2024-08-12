import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import AddReviewComponent from '../AddReviewComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import ReviewCard from '../ReviewCard';
import styles from './style';

export type ReviewType = {
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
  const handleSubmitReview = (newReview: ReviewType) => {
    firestore()
      .collection('reviews')
      .add(newReview)
      .then(() => setIsAddingReview(false));
  };
  useEffect(() => {
    fetchReviews();
  }, [isAddingReview]);
  const fetchReviews = () => {
    firestore()
      .collection('reviews')
      .where('hotelId', '==', passedHotelId)
      .get()
      .then(querySnapshot => {
        setReviews(querySnapshot.docs.map((i: any) => i.data()));
      });
  };

  return (
    <View style={screenStyles.container}>
      {!isAddingReview ? (
        <FlatList
          ListHeaderComponent={
            <View style={screenStyles.header}>
              <TouchableOpacity onPress={() => setGoToReviewComponent(false)}>
                <Text style={commonStyles.boldText}>
                  <AntDesign name="arrowleft" size={20} /> Reviews
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsAddingReview(true)}>
                <Text style={[commonStyles.redText, commonStyles.boldText]}>
                  <AntDesign name="plus" size={20} /> Add your review
                </Text>
              </TouchableOpacity>
            </View>
          }
          data={reviews}
          renderItem={({item}) => <ReviewCard review={item} />}
          ListEmptyComponent={
            <ActivityIndicator size={50} color={ColorPalette.gray} />
          }
        />
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
