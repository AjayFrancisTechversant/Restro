import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';

const PaymentInfoScreen = () => {
  //fetch orderDetails from db
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <ScrollView style={screenStyles.container}>
      <HeaderComponent color={ColorPalette.gray} />
      <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
        Payment Info
      </Text>
      
    </ScrollView>
  );
};

export default PaymentInfoScreen;
