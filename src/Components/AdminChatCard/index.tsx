import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {SetStateType} from '../../Types/Types';

type AdminChatCardPropsType = {
  fromEmailId: string;
  setSelectedEmail: SetStateType<string>;
};
const AdminChatCard: React.FC<AdminChatCardPropsType> = ({
  fromEmailId,
  setSelectedEmail,
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
    <TouchableOpacity
      style={screenStyles.card}
      onPress={() => setSelectedEmail(fromEmailId)}>
      <Text>{fromEmailId}</Text>
    </TouchableOpacity>
  );
};

export default AdminChatCard;
