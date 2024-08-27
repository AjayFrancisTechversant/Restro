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
      backgroundColor: ColorPalette.white,
      borderRadius: 10,
      padding: height * 0.02,
      marginBottom: height * 0.01,
      marginHorizontal: height * 0.02,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 10,
      marginBottom: height * 0.01,
    },
    starStyle:{marginHorizontal: -1},
    heading: {fontWeight: 'bold'},
  });

export default styles;
