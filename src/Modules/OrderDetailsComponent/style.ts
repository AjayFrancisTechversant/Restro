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
    addMoreItemsButton: {
      alignSelf: 'flex-end',
    },
    couponCodeStyle: {
      marginVertical: height * 0.02,
    },
    amountContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    lineBreak: {
      width: width * 0.9,
      borderWidth: 0.5,
      alignSelf: 'center',
      marginVertical: height * 0.01,
    },
    footerStyle: {
      marginVertical: height * 0.03,
    },
  });

export default styles;
