import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type MyTextInputPropsType = {
  color?: string;
  errorText?: string;
} & TextInputProps;

const MyTextInput: React.FC<MyTextInputPropsType> = ({
  onChangeText,
  color,
  errorText,
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
    <View>
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
      {errorText&&<Text style={screenStyles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default MyTextInput;
