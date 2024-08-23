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
      flexDirection: 'row',
      width: width * 0.8,
      gap: height * 0.02,
      alignItems: 'center',
      margin: height * 0.01,
    },
  });

export default styles;
