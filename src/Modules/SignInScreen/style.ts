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
    rememberMeSuperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: height * 0.01,
      justifyContent: 'space-between',
    },
    rememberMeContainer: {
      flexDirection: 'row',
      gap: height * 0.01,
      alignItems: 'center',
    },
    ContinueAsRememberedButton: {
      backgroundColor: ColorPalette.white,
      borderRadius: 10,
      padding: height * 0.02,
      justifyContent: 'center',
      alignItems: 'center',width:width*0.5
    },
    bottomContainer: {
      position: 'absolute',
      bottom: height * 0.05,
      alignSelf: 'center',
    },
    dontHaveAccountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: height * 0.03,
      gap: height * 0.01,
    },
  });

export default styles;
