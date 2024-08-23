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
      height: isPortrait ? height : 'auto',
      padding: height * 0.02,
      backgroundColor: ColorPalette.white,
      justifyContent: 'space-between',
    },
    mainTextContainer: {marginTop: height * 0.1},
    bigText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginHorizontal: height * 0.02,
    },
    textInput: {
      width: width * 0.9,
      alignSelf: 'center',
      borderWidth: 1,
      marginVertical: height * 0.01,
    },
    coolTipContainer: {margin: height * 0.02},
    bottomButton: {
      marginBottom: height * 0.01,
    },
  });

export default styles;
