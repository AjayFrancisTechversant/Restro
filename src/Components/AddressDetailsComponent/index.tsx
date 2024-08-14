import {View, Text} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {useAppSelector} from '../../hooks/hooks';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const AddressDetailsComponent = () => {
  const {address, city, state, zipcode} = useAppSelector(
    state => state.addressDetails,
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
          Delivery Address Details
        </Text>
        <MaterialIcons
          name="delivery-dining"
          color={ColorPalette.white}
          size={50}
        />
      </View>
      <View style={commonStyles.flexDirectionRow}>
        <Text
          style={[
            commonStyles.boldText,
            commonStyles.whiteText,
            {justifyContent: 'flex-start'},
          ]}>
          Address:{' '}
        </Text>
        <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
          {address}
        </Text>
      </View>
      <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
        City: {city}
      </Text>
      <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
        State: {state}
      </Text>
      <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
        ZipCode: {zipcode}
      </Text>
    </View>
  );
};

export default AddressDetailsComponent;
