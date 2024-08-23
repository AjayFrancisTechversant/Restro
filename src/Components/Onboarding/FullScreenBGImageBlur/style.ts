import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../../Contexts/ScreenContext';

const styles = (
  height: number,
  width: number,
  isPortrait: boolean,
  isTypeTablet: boolean,
  screenContext: ScreenContextType,
) =>
  StyleSheet.create({
    image: {
      height,
      width: isPortrait ? width : height,
    },
  });

export default styles;
