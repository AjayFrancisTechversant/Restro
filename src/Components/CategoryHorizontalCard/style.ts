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
      borderWidth: 0.5,
      borderColor: ColorPalette.red,
      height: height * 0.15,
      width: height * 0.15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,margin:height*0.005
    },
  });

export default styles;
