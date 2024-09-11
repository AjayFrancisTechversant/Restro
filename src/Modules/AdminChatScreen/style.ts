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
      padding: height * 0.02,
    },
    emptyTextStyle: {alignSelf:'center',fontWeight:'bold',fontSize:20,margin:height*0.02},
  });

export default styles;
