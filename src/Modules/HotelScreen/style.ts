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
      flex: 1
    },
    headerComponentContainer: {width:isPortrait? width * 0.9:height*0.9,alignSelf:'center'},
    bgImage: {
      position: 'absolute',
      height:isPortrait? height * 0.4:width*0.6,
      width:isPortrait?width:height,
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
    bottomButton: {
      alignSelf: 'center',marginBottom:height*0.02
    },
  });

export default styles;
