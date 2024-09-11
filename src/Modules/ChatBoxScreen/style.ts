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
      padding: height * 0.01,
      height: isPortrait ? height : width,
      width: isPortrait ? width : height,backgroundColor:ColorPalette.white,
      paddingBottom:30
    },
    backButton: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      padding: height * 0.01,
    },
    heading: {
      alignSelf: 'center',
      marginBottom: height * 0.01,
      fontWeight: 'bold',
    },
  });

export default styles;
