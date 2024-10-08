import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

type AdminChatCardPropsType = {
  email: string;
};
const AdminChatCard: React.FC<AdminChatCardPropsType> = ({email}) => {
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <TouchableOpacity
      style={screenStyles.card}
      onPress={() => navigation.navigate(StaticVariables.ChatBoxScreen, {email})}>
      <Text>{email}</Text>
    </TouchableOpacity>
  );
};

export default AdminChatCard;
