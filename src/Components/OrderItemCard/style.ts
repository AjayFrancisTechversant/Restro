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
      elevation: 5,
      backgroundColor: ColorPalette.white,
      borderRadius: 10,
      marginVertical: height * 0.02,
      flexDirection: 'row',gap:width*0.01
    },
  });

export default styles;
