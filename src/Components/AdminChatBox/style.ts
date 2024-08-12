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
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: ColorPalette.gray,
      flex: 1,
      padding: height * 0.02,
    },
  });

export default styles;
