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
      padding: height * 0.02,
      flex: 1,
    },
    bgImage: {
      position: 'absolute',
      height: isPortrait ? height * 0.4 : width * 0.6,
      width: isPortrait ? width : height,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    hotelDetailscontainer: {
      backgroundColor: ColorPalette.white,
      borderRadius: 20,
      padding: height * 0.02,
      marginTop: height * 0.15,
      gap: height * 0.02,
      elevation: 10,
    },
    chipsContainer: {
      flexDirection: 'row',
      gap: width * 0.01,
    },
    ratingsContainerButton: {flexDirection: 'row'},
    reservationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactButton: {
      borderColor: ColorPalette.red,
      borderWidth: 1,
      width: width * 0.2,
      height: height * 0.05,
      padding: 0,
    },
    navigationButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: height * 0.02,
    },
    addRatingContainer: {
      backgroundColor: ColorPalette.white,
      padding: height * 0.02,
      elevation: 5,
      borderRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      marginVertical: height * 0.01,
    },
    ratingText: {
      fontWeight: 'bold',
      color: ColorPalette.red,
      marginVertical: height * 0.01,
    },
    textInput: {margin: height * 0.01},
    bottomButton: {
      alignSelf: 'center',
      marginBottom: height * 0.02,
    },
  });

export default styles;
