import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Contexts/ScreenContext';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    container: {alignSelf: 'center'},
    textInput: {
      backgroundColor: ColorPalette.white,
      borderRadius: 5,
      fontWeight: 'bold',
      width: isPortrait ? width * 0.8 : height * 0.8,
    },
    errorText: {
      position: 'absolute',
      right: 60,
      top: 10,
      color: ColorPalette.red,
      fontWeight: 'bold',
    },
  });
export default styles;
