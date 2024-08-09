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
      margin: height * 0.01,
      padding: height * 0.01,
    },
    textInput: {margin: height * 0.01},
    bottomButton: {
      alignSelf: 'center',
      backgroundColor: ColorPalette.red,marginBottom:height*0.02
    },
  });

export default styles;
