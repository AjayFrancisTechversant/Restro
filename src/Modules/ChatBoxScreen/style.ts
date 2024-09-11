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
    container: {flex: 1, padding: height * 0.01},
    backButton: {alignSelf:'flex-start',flexDirection:'row',alignItems:'center',padding:height*0.01},
    heading:{alignSelf:'center',marginBottom:height*0.01,fontWeight:'bold'}
  });

export default styles;
