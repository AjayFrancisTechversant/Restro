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
      padding: height * 0.02,
      backgroundColor: ColorPalette.red,
      justifyContent: 'space-between',
    },
    checkIconStyle: {
      alignSelf: 'center',
      margin: height * 0.02,
    },
    heading: {
      color: ColorPalette.white,
      fontSize: 35,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    hotelNameText: {
      color: ColorPalette.white,
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: height * 0.03,
    },
    orderNumberText: {
      color: ColorPalette.white,
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: height * 0.05,
    },
    text: {
      alignSelf: 'center',
      marginVertical: height * 0.01,
      color: ColorPalette.white,
    },
    bottomButton: {
      backgroundColor: ColorPalette.white,
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
  });

export default styles;
