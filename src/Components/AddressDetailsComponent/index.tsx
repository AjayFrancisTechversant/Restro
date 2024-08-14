import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';

const AddressDetailsComponent = () => {
  //get addressDetails from redux
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
      <Text style={commonStyles.boldText}>Address Details </Text>
      <Text>Address </Text>
      <Text>city </Text>
      <Text>state </Text>
      <Text>zipcode </Text>
    </View>
  );
};

export default AddressDetailsComponent;
