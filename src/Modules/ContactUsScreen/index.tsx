import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {FieldValue} from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import NotAdminChatBox from '../../Components/NotAdminChatBox';
import StaticVariables from '../../Preferences/StaticVariables';
import AdminChat from '../../Components/AdminChat';
import styles from './style';

export type MessageType = {
  text: string;
  createdAt: FieldValue;
  toEmail: string | undefined | null;
  fromEmail: string | undefined | null;
};
const ContactUsScreen = () => {
  const currentUserId = auth().currentUser?.uid;
  const isAdmin = currentUserId == StaticVariables.ADMIN_UID;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.container}>
      <HeaderComponent color={ColorPalette.gray} />
      <Text style={[screenStyles.heading, commonStyles.bigBoldText]}>
        Chat with Us
      </Text>
      {isAdmin ? <AdminChat /> : <NotAdminChatBox />}
    </View>
  );
};

export default ContactUsScreen;
