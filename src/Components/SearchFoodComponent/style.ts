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
    searchBarStyle: {
      alignSelf: 'center',
      margin: height * 0.01,
      backgroundColor: ColorPalette.offWhite,
      borderRadius: 10,
    },
  });

export default styles;
