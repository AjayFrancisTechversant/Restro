import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const SuccessScreenDelivery = () => {
  //get orderdetails from db
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  //clear order details from db using remove the doc using uid on finish

  return (
    <View>
      <Text>SuccessScreenDelivery</Text>
    </View>
  );
};

export default SuccessScreenDelivery;
