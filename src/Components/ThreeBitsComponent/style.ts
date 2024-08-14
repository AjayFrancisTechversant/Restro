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
      gap: width * 0.02,
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
    eachBit: {
      height: 5,
      width: 30,
      borderRadius: 10,
      backgroundColor: ColorPalette.gray,
    },
  });

export default styles;
