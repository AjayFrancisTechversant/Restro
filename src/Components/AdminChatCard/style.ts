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
      padding: height * 0.02,
      elevation: 5,margin:height*0.01,
      borderRadius: 10,
      backgroundColor: ColorPalette.white,
    },
  });

export default styles;
