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
      padding: height * 0.02,
      flex: 1,
      backgroundColor: ColorPalette.white,
    },
    contentContainerStyle: {paddingBottom: height * 0.03},
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: ColorPalette.red,
      alignSelf: 'center',
    },
  });

export default styles;
