import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../../Assets/Themes/ColorPalette';

type PreferenceRadioCardPropstype = {
  isSelected: boolean;
  text: string;
};

const PreferenceRadioCard: React.FC<PreferenceRadioCardPropstype> = ({
  text,
  isSelected,
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
    <View
      style={[
        screenStyles.card,
        {
          borderWidth: 3,
          borderColor: isSelected ? ColorPalette.red : ColorPalette.white,
        },
      ]}>
      <Text style={screenStyles.boldText}>{text}</Text>
      <Ionicons
        name={
          isSelected ? 'radio-button-on-outline' : 'radio-button-off-outline'
        }
        size={30}
        color={isSelected ? ColorPalette.red : ColorPalette.black}
      />
    </View>
  );
};

export default PreferenceRadioCard;
