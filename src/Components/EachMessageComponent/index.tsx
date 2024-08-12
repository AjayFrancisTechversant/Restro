import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {MessageType} from '../../Modules/ContactUsScreen';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type EachMessageComponentPropsType = {
  message: MessageType;
};
const EachMessageComponent: React.FC<EachMessageComponentPropsType> = ({
  message,
}) => {
  const currentUserId = auth().currentUser?.uid;
  const isMyMessage = message.fromUid == currentUserId;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <View
      style={[
        screenStyles.bubble,
        {
          backgroundColor: isMyMessage
            ? ColorPalette.blue
            : ColorPalette.lightGray,
        },
        {alignSelf: isMyMessage ? 'flex-end' : 'flex-start'},
      ]}>
      <Text
        style={{color: isMyMessage ? ColorPalette.white : ColorPalette.black}}>
        {message.text}
      </Text>
    </View>
  );
};

export default EachMessageComponent;
