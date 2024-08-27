import {View, Text} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';

type ReviewsAvgComponentPropsType = {
  hotelId: string;
  inHotelCard?: boolean;
};

const ReviewsAvgComponent: FC<ReviewsAvgComponentPropsType> = ({
  hotelId,
  inHotelCard,
}) => {
  const [avgRating, setAvgRating] = useState<number | undefined>(undefined);
  const [noOfReviews, setNoOfReviews] = useState(0);
  useEffect(() => {
    const subscriber = firestore()
      .collection('reviews')
      .where('hotelId', '==', hotelId)
      .onSnapshot(querrySnapshot => {
        const filteredReviews = querrySnapshot.docs.map(i => i.data());
        const ratings = filteredReviews.map(i => i.rating);
        const sum: number = ratings.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );
        const avg = sum / ratings.length;
        setAvgRating(Number(avg.toPrecision(2)));
        setNoOfReviews(ratings.length);
      });
    return () => subscriber();
  }, []);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.container}>
      {avgRating ? (
        <>
          {!inHotelCard ? (
            <StarRatingDisplay
              rating={avgRating}
              starSize={20}
              starStyle={screenStyles.starStyle}
              color={ColorPalette.red}
            />
          ) : (
            <AntDesign name="star" size={20} color={ColorPalette.gold} />
          )}
          <Text style={[commonStyles.redText, commonStyles.boldText]}>
            {avgRating}
          </Text>
        </>
      ) : null}
      <Text>({noOfReviews} Reviews)</Text>
    </View>
  );
};

export default ReviewsAvgComponent;
