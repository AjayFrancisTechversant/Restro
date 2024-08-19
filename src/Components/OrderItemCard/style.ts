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
      marginTop: height * 0.02,
      flexDirection: 'row',
      gap: width * 0.01,
      justifyContent: 'space-between',
    },
    view1: {flex: 1},
    view2: {flex: 8},
    view3: {flex: 1, justifyContent: 'flex-end'},
  });

export default styles;
