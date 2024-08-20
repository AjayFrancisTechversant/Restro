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
    headerComponentStyle: {
      position: 'absolute',
      width: width,
      alignSelf: 'center',
      margin: height * 0.02,
    },
    imageStyle: {height: height * 0.3, width},
    container: {flex: 1, padding: height * 0.02},
    heading: {fontWeight: 'bold', fontSize: 30, marginVertical: height * 0.01},
    proteinContainer: {marginVertical: height * 0.02, borderWidth: 1},
    proteinContainerHeader: {flexDirection:'row',justifyContent:'space-between'},
    textInput: {
      borderWidth: 0.5,
      borderColor: ColorPalette.gray,
      marginVertical: height * 0.01,
    },
    quantityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: height * 0.02,
    },
    counterContainer: {flexDirection: 'row', gap: height * 0.01},
    addToOrderButton: {
      backgroundColor: ColorPalette.red,
      width: width * 0.7,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ViewOrderButton: {
      backgroundColor: ColorPalette.red,
      alignSelf: 'center',
      bottom: 0,
    },
  });

export default styles;
