import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {updatePreference} from '../../Redux/Slices/UserDetailsSlice';
import styles from './style';

type MySegmentedButtonsPropsType = {
  nonEditable?: boolean;
};
const MySegmentedButtons: React.FC<MySegmentedButtonsPropsType> = ({
  nonEditable,
}) => {
  const navigation: any = useNavigation();
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
  const renderNonEditableAlert = () => {
    return Alert.alert(
      'Not now!',
      'You cannot change this option at the moment. You can go back to Home screen and restart again if you want!',
      [
        {
          text: 'Go to Home',
          onPress: () => navigation.popToTop(),
          style: 'cancel',
        },
        {text: 'OK'},
      ],
    );
  };
  return (
    <View style={screenStyles.MySegmentedButtonsContainer}>
      <View style={screenStyles.container}>
        <TouchableOpacity
          onPress={() => {
            if (nonEditable) {
              renderNonEditableAlert();
            } else dispatch(updatePreference('dine-in'));
          }}
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
          onPress={() => {
            if (nonEditable) {
              renderNonEditableAlert();
            } else dispatch(updatePreference('carry-out'));
          }}
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
          onPress={() => {
            if (nonEditable) {
              renderNonEditableAlert();
            } else dispatch(updatePreference('delivery'));
          }}
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
