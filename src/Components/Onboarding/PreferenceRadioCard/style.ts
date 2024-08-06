import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../../Contexts/ScreenContext';
import ColorPalette from '../../../Assets/Themes/ColorPalette';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    card: {
      width: width * 0.9,
      backgroundColor: ColorPalette.white,
      padding: height * 0.02,
      borderRadius: 10,
      marginVertical: height * 0.01,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boldText: {fontWeight: 'bold'},
  });

export default styles;
