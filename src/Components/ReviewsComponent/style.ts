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
      marginTop: height * 0.01,
    },
    header: {flexDirection: 'row', justifyContent: 'space-between'},
    addReviewButton: {},
    bottomButton: {
      alignSelf: 'center',
      backgroundColor: ColorPalette.red,
    },
  });

export default styles;
