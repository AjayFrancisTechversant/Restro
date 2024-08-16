import {StyleSheet} from 'react-native';
import ColorPalette from '../Assets/Themes/ColorPalette';

export const commonStyles = StyleSheet.create({
  boldText: {fontWeight: 'bold'},
  whiteText: {color: ColorPalette.white},
  underlinedText: {textDecorationLine: 'underline'},
  bigBoldText: {fontWeight: 'bold', fontSize: 20},
  redText: {color: ColorPalette.red},
  flexOne: {flex: 1},
  flexShrinkOne: {flexShrink: 1},
  flexDirectionRow: {flexDirection: 'row'},
  redTextBoldXL: {color: ColorPalette.red, fontSize: 30, fontWeight: 'bold'},
  alignSelfCenter: {alignSelf: 'center'},
});
