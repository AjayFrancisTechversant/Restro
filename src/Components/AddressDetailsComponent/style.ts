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
      marginVertical: height * 0.01,
      backgroundColor: ColorPalette.lightRed,
      padding: height * 0.03,
      alignSelf: 'center',
      borderRadius: 10,
      elevation: 5,
    },
    headerContainer: {
      alignItems: 'center',
    },
  });

export default styles;
