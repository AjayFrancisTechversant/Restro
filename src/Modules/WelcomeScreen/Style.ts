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
    textInput: {
      width: width * 0.9,
      alignSelf: 'center',
    },
    bottomButtonsContainer: {
      position: 'absolute',
      bottom: height * 0.05,
      alignSelf: 'center',
    },
    button1: {
      borderWidth: 2,
      borderColor: ColorPalette.white,
      flexDirection: 'row',
      gap: height * 0.01,marginVertical:height*0.02
    },
    button2:{
      
    }
  });

export default styles;
