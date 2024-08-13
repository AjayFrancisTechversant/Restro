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
      borderWidth: 0.5,
      borderColor: ColorPalette.red,
      width: width * 0.4,
      height: width * 0.4,
      margin: width * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      gap: height * 0.01,
    },
  });

export default styles;
