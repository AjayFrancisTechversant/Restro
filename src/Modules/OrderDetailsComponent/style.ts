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
    container: {flex: 1, borderWidth: 1, padding: height * 0.02},
  });

export default styles;
