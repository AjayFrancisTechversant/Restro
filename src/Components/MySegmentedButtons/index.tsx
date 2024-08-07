import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {updatePreference} from '../../Redux/Slices/UserDetailsSlice';

const MySegmentedButtons = () => {
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const dispatch = useAppDispatch();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.MySegmentedButtonsContainer}>
      <View style={screenStyles.container}>
        <TouchableOpacity
          onPress={() => dispatch(updatePreference('dine-in'))}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'dine-in'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'dine-in'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Dine-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updatePreference('carry-out'))}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'carry-out'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'carry-out'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Carry-out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updatePreference('delivery'))}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'delivery'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'delivery'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Delivery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MySegmentedButtons;
