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
    container: {flex: 1, padding: height * 0.02},
    heading: {alignSelf: 'center'},
    lineStyle: {width: '100%', borderWidth: 0.2, marginVertical: height * 0.01},
    bigContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',marginVertical:height*0.05
    },
    textInput: {marginVertical: height * 0.01},
    bottomButton: {alignSelf: 'center'},
  });

export default styles;
