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
    container: {padding: height * 0.02, flex: 1},
    mainTextContainer: {marginTop: height * 0.1},
    bigText: {
      fontSize: 40,
      fontWeight: 'bold',
      marginHorizontal: height * 0.02,
    },
    subText: {margin: height * 0.03},
    textInput: {marginVertical: height * 0.01},
    resendEmailContainer:{flexDirection:'row',gap:height*0.01,alignSelf:'center',marginTop:height*0.05},
    resendMailButton: {alignSelf: 'center',},
    bottomButton: {
      position: 'absolute',
      bottom: height * 0.05,
      alignSelf: 'center',
    },checkSpamText:{alignSelf: 'center',}
  });

export default styles;
