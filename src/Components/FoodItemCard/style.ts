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
    card: {
      padding: height * 0.02,
      flex: 1,
      backgroundColor: ColorPalette.white,
      marginTop: height * 0.01,
      borderRadius: 20,
      flexDirection: 'row',
      gap: width * 0.05,
    },
    imageStyle: {height: width * 0.3, width: width * 0.3, borderRadius: 10},
    imageLoadingindicator: {
      height: width * 0.3,
      width: width * 0.3,
      borderRadius: 10,
      position: 'absolute',
    },
    hotelDetailsContainer: {
      padding: height * 0.01,
      gap: height * 0.01,
      flexShrink: 1,
    },
  });

export default styles;
