import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';
import {useAppSelector} from '../../hooks/hooks';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const VehicleDetailsComponent = () => {
  const {category, make, model, number} = useAppSelector(
    state => state.vehicleDetails,
  );
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
      <View style={screenStyles.headerContainer}>
        <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
          Your Vehicle Details
        </Text>
        <MaterialCommunityIcons
          name="steering"
          color={ColorPalette.white}
          size={30}
        />
      </View>
      <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
        {make} {model} ({category})-{number}
      </Text>
    </View>
  );
};

export default VehicleDetailsComponent;
