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
    mainTextContainer: {marginTop: height * 0.1},
    bigText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginHorizontal: height * 0.02,
    },
    subText: {margin: height * 0.03},
    textInput: {marginVertical: height * 0.01},
    alreadyHaveAccountContainer: {
      flexDirection: 'row',
      gap: height * 0.02,
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
    loginButton: {
      borderWidth: 1,
      borderColor: ColorPalette.white,
      width: width * 0.3,
      padding: height * 0.01,
    },
    bottomButton: {
      position: 'absolute',
      bottom: height * 0.05,
      alignSelf: 'center',
    },
  });

export default styles;
