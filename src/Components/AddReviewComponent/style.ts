import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: ColorPalette.lightGray,
      borderRadius: 20,
      flex: 1,
    },
    textInput: {margin: height * 0.01},
    bottomButton: {
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: ColorPalette.red,
      bottom:height * 0.03,
    },
  });

export default styles;
