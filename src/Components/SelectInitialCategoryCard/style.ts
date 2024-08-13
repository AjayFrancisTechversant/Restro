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
    card: {
      borderRadius: 10,
      width: width * 0.4,
      height: width * 0.4,
      margin: width * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      gap: height * 0.01,
      elevation: 5,
      backgroundColor: ColorPalette.white,
    },
  });

export default styles;
