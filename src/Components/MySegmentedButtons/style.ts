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
    MySegmentedButtonsContainer:{margin:height*0.05},
    container: {
      alignSelf: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: ColorPalette.gray,
      height: height * 0.08,
      flexDirection: 'row',
      width: width * 0.8,
    },
    eachButtonStyle: {
      flex: 1 / 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
  });

export default styles;
