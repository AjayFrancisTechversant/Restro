import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {ReviewType} from '../../Modules/ReviewsScreen';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import ColorPalette from '../../Assets/Themes/ColorPalette';

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
      <View style={screenStyles.header}>
        <StarRatingDisplay
          rating={review.rating}
          starSize={20}
          starStyle={screenStyles.starStyle}
          color={ColorPalette.red}
        />
        <Text style={[commonStyles.redText, commonStyles.boldText]}>
          {review.rating}
        </Text>
        <Text style={screenStyles.heading}>{review.name}</Text>
      </View>
      <Text>{review.comment}</Text>
    </View>
  );
};

export default ReviewCard;
