import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';

const VehicleDetailsComponent = () => {
  //get vehicledetails from redux
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
      <Text style={commonStyles.boldText}>Vehicle Info</Text>
      <Text>SUV - Silver Toyota</Text>
    </View>
  );
};

export default VehicleDetailsComponent;
