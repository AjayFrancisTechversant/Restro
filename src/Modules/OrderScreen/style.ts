import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Contexts/ScreenContext';

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
    bottomButton: {alignSelf: 'center'},
    footerStyle: {
      marginVertical: height * 0.02,
    },
  });

export default styles;
