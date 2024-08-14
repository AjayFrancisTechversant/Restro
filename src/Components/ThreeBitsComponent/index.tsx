import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
type ThreeBitsComponentPropsType = {
  step: 1 | 2 | 3;
};
const ThreeBitsComponent: React.FC<ThreeBitsComponentPropsType> = ({step}) => {
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
      <View
        style={[
          screenStyles.eachBit,
          {backgroundColor: ColorPalette.red},
        ]}></View>
      <View
        style={[
          screenStyles.eachBit,
          {
            backgroundColor:
              step == 2 || step == 3 ? ColorPalette.red : ColorPalette.gray,
          },
        ]}></View>
      <View
        style={[
          screenStyles.eachBit,
          {backgroundColor: step == 3 ? ColorPalette.red : ColorPalette.gray},
        ]}></View>
    </View>
  );
};

export default ThreeBitsComponent;
