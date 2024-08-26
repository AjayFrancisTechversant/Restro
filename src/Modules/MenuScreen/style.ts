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
      paddingBottom: height * 0.1,
    },
    flatlist1contentContainerStyle: {
      alignItems: 'center',
      paddingBottom: height * 0.05,
    },
    flatlist2contentContainerStyle: {
      paddingBottom: height * 0.05,
    },loaderStyle:{width:'100%'},
    headerComponentStyle: {width: isPortrait?width * 0.9:height*0.9},
    heading: {alignSelf: 'center', fontWeight: 'bold', fontSize: 30},
    noItemsText: {alignSelf: 'center', margin: height * 0.1},
  });

export default styles;
