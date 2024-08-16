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
      justifyContent: 'space-between',
    },
    checkIconStyle: {
      alignSelf: 'center',
      margin: height * 0.02,
    },
    heading: {
      fontSize: 35,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    hotelNameText: {
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: height * 0.03,
    },
    orderNumberText: {
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: height * 0.05,
    },
    text: {
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
    bottomButton: {
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
    contactUsButton: {
      alignSelf: 'center',
      marginVertical: height * 0.01,
      borderWidth: 1,
      borderColor: ColorPalette.red,
    },
  });

export default styles;
