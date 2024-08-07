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
    logoutButton: {backgroundColor: ColorPalette.red, padding: height * 0.01,borderRadius:10,justifyContent:'center',alignItems:'center'},
  });

export default styles;
