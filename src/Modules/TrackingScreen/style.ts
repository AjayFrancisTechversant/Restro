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
    backButton: {position: 'absolute', left: height * 0.02, top: height * 0.02},
    heading: {alignSelf: 'center', fontWeight: 'bold', fontSize: 20},
    mapContainer: {
      borderWidth: 0.5,
      borderRadius: 10,
      flex: 1,
      marginTop: height * 0.01,
      borderColor: ColorPalette.gray,overflow:'hidden'
    },
  });

export default styles;
