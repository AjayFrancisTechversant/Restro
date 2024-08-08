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
    bookmarkButton: {position:'absolute',right:0},
    imageStyle: {height: width * 0.3, width: width * 0.3, borderRadius: 10},
    hotelDetailsContainer: {paddingVertical: height * 0.01, gap: height * 0.01},
    ratingText: {position: 'absolute', bottom: 0},
  });

export default styles;
