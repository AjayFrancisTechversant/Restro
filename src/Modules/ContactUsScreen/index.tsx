import {View, Text, BackHandler, Alert} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {ADMIN_UID} from '@env';
import {FieldValue} from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import NotAdminChatBox from '../../Components/NotAdminChatBox';
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
  const isAdmin = currentUserId == ADMIN_UID;
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
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
        {!isAdmin ? `Chat with Us` : `Chat as Admin`}
      </Text>
      {isAdmin ? <AdminChat /> : <NotAdminChatBox />}
    </View>
  );
};

export default ContactUsScreen;
