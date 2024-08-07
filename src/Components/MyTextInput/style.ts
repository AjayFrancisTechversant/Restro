import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Contexts/ScreenContext';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    textInput: {
      backgroundColor: ColorPalette.white,
      borderRadius: 5,
      fontWeight: 'bold',
    },
    errorText:{position:'absolute',right:60,top:10,color:ColorPalette.red,fontWeight:'bold'}
  });
export default styles;
