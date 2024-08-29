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
    backButton: {position: 'absolute', left: height * 0.04, top: height * 0.04},
    heading: {alignSelf: 'center', margin: height * 0.02},
    logoutButton: {
      position: 'absolute',
      top: height * 0.02,
      right: height * 0.02,
    },
    detailsContainer: {
      backgroundColor: ColorPalette.lightRed,
      elevation: 5,
      width: width * 0.8,
      alignSelf: 'center',
      padding: height * 0.02,
      borderRadius: 20,
    },
    imageStyle: {
      height: height * 0.1,
      width: height * 0.1,
      alignSelf: 'center',
      borderRadius: height * 0.1,
    },
  });

export default styles;
