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
    hotelName: {marginVertical: height * 0.01, fontSize: 25},
    orderCard: {
      elevation: 5,
      backgroundColor: ColorPalette.white,
      borderRadius: 10,
      padding: height * 0.02,
      margin: height * 0.01,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardImageStyle: {
      height: height * 0.05,
      width: height * 0.08,
      borderRadius: 10,
    },
    atmCardsContainer: {
      flexDirection: 'row',
      gap: height * 0.01,
      margin: height * 0.02,
    },
    textInput: {marginVertical: height * 0.01},
    smallTextInput: {
      marginVertical: height * 0.01,
      width: isPortrait ? width * 0.38 : height * 0.38,
    },
    expCvvContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: isPortrait ? width * 0.8 : height * 0.8,
    },
    bottomButton: {alignSelf: 'center'},
  });

export default styles;
