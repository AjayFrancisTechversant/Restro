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
    },
    headerComponentStyle: {width:width*0.9},
    heading: {alignSelf: 'center', fontWeight: 'bold', fontSize: 30},
    
  });

export default styles;
