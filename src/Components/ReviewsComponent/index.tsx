import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';

type ReviewsComponentPropsType = {
  setGoToReviewComponent: SetStateType<boolean>;
};

const ReviewsComponent: React.FC<ReviewsComponentPropsType> = ({
  setGoToReviewComponent,
}) => {
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
      <View style={screenStyles.header}>
        <TouchableOpacity onPress={() => setGoToReviewComponent(false)}>
          <Text style={commonStyles.boldText}>
            <AntDesign name="arrowleft" size={20} /> Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.addReviewButton}>
          <Text style={[commonStyles.redText, commonStyles.boldText]}>
            <AntDesign name="plus" size={20} /> Add your review
          </Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
};

export default ReviewsComponent;
