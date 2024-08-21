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
    bubble: {
      padding: height * 0.01,
      paddingHorizontal: height * 0.02,
      borderRadius: 20,
      marginBottom: 2,
    },
  });

export default styles;
