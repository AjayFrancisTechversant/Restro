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
    container: {padding: height * 0.02, flex: 1},
    mainTextContainer: {marginVertical: height * 0.1},
    bigText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginHorizontal: height * 0.02,
    },
    subText: {margin: height * 0.03},
    textInput: {marginVertical: height * 0.01},
    box: {
      height: height * 0.5,
      marginTop: height * 0.1,
      width: width * 0.9,
      alignSelf: 'center',
      backgroundColor: ColorPalette.white,
      borderRadius: 10,
      padding: height * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      gap: height * 0.03,
    },
    bottomButton: {
      position: 'absolute',
      bottom: height * 0.05,
      alignSelf: 'center',
    },
  });

export default styles;
