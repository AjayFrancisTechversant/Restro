import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {StyleProp, TextStyle} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type MyTextInputPropsType = {
  color?: string;
} & TextInputProps;

const MyTextInput: React.FC<MyTextInputPropsType> = ({
  onChangeText,
  color,
  style,
  ...props
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <TextInput
      onChangeText={onChangeText}
      selectionColor={color ? color : ColorPalette.gray}
      underlineColor={color ? color : ColorPalette.white}
      activeUnderlineColor={color ? color : ColorPalette.gray}
      outlineColor={color ? color : ColorPalette.gray}
      activeOutlineColor={color ? color : ColorPalette.white}
      cursorColor={color ? color : ColorPalette.gray}
      underlineStyle={{height: 0}}
      style={[screenStyles.textInput, style]}
      {...props}
    />
  );
};

export default MyTextInput;
