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
      borderWidth: 0.5,
      flex: 1,
      padding: height * 0.01,
      borderRadius: 10,
      borderColor: ColorPalette.gray,
    },
    textInput: {borderWidth: 0.5},
  });

export default styles;
