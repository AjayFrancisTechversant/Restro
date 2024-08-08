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
    },
    backButton: {position: 'absolute', left: height * 0.04, top: height * 0.04},
    heading: {alignSelf: 'center',margin:height*0.02},
    logoutButton: {
      position: 'absolute',
      top: height * 0.02,
      right: height * 0.02,
    },detailsContainer:{
        backgroundColor:ColorPalette.lightGray,padding:height*0.02,borderRadius:20
    }
  });

export default styles;
