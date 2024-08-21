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
      flex: 1,
      borderRadius: 10,
    },
    textInput: {borderWidth: 0.5},
    backButton: {position: 'absolute'},
    heading: {alignSelf: 'center', fontWeight: 'bold',marginBottom:height*0.01},
  });

export default styles;
