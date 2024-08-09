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
      flex: 1,borderWidth:1,marginTop:height*0.01
    },
    header: {flexDirection: 'row', justifyContent: 'space-between'},
    addReviewButton: {},
    bottomButton: {
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: ColorPalette.red,
      bottom: height * 0.03,
    },
  });

export default styles;
