import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type AdminChatboxCardPropsType = {
  messageSets: any;
};
const AdminChatboxCard: React.FC<AdminChatboxCardPropsType> = ({
  messageSets,
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
    <View style={screenStyles.card}>
      <Text>{messageSets.fromUid}</Text>
    </View>
  );
};

export default AdminChatboxCard;
