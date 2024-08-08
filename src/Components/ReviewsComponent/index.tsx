import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import AddReviewComponent, { NewReviewType } from '../AddReviewComponent';
import styles from './style';
import MyButton from '../MyButton';

type ReviewsComponentPropsType = {
  setGoToReviewComponent: SetStateType<boolean>;
};

const ReviewsComponent: React.FC<ReviewsComponentPropsType> = ({
  setGoToReviewComponent,
}) => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmitReview = (newReview:NewReviewType) => {
    console.log(newReview);
    
  };

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
          <MyButton style={screenStyles.bottomButton}>
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
          <AddReviewComponent handleSubmitReview={handleSubmitReview} setIsAddingReview={setIsAddingReview}/>

        </>
      )}
    </View>
  );
};

export default ReviewsComponent;
