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
    atmCard: {
      backgroundColor: ColorPalette.darkRed,
      padding: height * 0.03,
      borderRadius: 10,
      alignSelf: 'center',
      width: width * 0.9,
      height:width*0.6,
      marginVertical: height * 0.02,
      elevation: 5,
    },
    headerComponent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.05,
    },
    cardNumberConatiner: {
      flexDirection: 'row',
      gap: width * 0.05,
    },
    detailsContainer: {
      flexDirection: 'row',
      gap: width * 0.2,
      marginVertical: height * 0.02,
    },
  });

export default styles;
