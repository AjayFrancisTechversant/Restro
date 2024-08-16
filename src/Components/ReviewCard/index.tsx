import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import { commonStyles } from '../../CommonStyles/CommonStyles';
import { ReviewType } from '../../Modules/ReviewsScreen';

type ReviewCardPropsType = {
  review: ReviewType;
};

const ReviewCard: React.FC<ReviewCardPropsType> = ({review}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.card}>
      <Text style={commonStyles.bigBoldText}>{review.name}</Text>
      <Text>Rating: <Text style={commonStyles.boldText}>{review.rating}</Text></Text>
      <Text>{review.comment}</Text>
    </View>
  );
};

export default ReviewCard;
