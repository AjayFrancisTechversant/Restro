import {Alert, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {arrayUnion} from '@react-native-firebase/firestore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ADMIN_UID} from '@env';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import {ContactUsStackParamsList} from '../../Services/Navigation/ContactUsStack';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';

type ChatBoxScreenPropsType = NativeStackScreenProps<
  ContactUsStackParamsList,
  'ChatBoxScreen'
>;

const ChatBoxScreen: FC<ChatBoxScreenPropsType> = ({route}) => {
  const currentUserId = auth().currentUser?.uid;
  const isAdmin = currentUserId == ADMIN_UID;
  const navigation = useNavigation();
  const {uid} = route.params;
  const [messages, setMessages] = useState<IMessage[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const resData: any = documentSnapshot.data();
          const sorted = resData?.messages?.sort(
            (a: any, b: any) => b.createdAt - a.createdAt,
          );
          setMessages(sorted);
        }
      });
    return () => subscriber();
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const newMessage = newMessages[0];
    const formattedNewMessage: IMessage = {
      ...newMessage,
      createdAt: Date.now(),
    };
    sendToFirestore(formattedNewMessage);
  }, []);

  const sendToFirestore = async (formattedNewMessage: IMessage) => {
    try {
      const isDocExisting = (
        await firestore().collection('chats').doc(uid).get()
      ).exists;
      if (!isDocExisting) {
        //create a new array
        await firestore()
          .collection('chats')
          .doc(uid)
          .set({messages: arrayUnion(formattedNewMessage)});
      } else {
        //push into array
        await firestore()
          .collection('chats')
          .doc(uid)
          .update({messages: arrayUnion(formattedNewMessage)});
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <View style={screenStyles.container}>
      {isAdmin ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={screenStyles.backButton}>
          <AntDesign name="left" size={20} />
          <Text style={commonStyles.boldText}>Back</Text>
        </TouchableOpacity>
      ) : (
        <HeaderComponent color={ColorPalette.gray} />
      )}
      <Text style={screenStyles.heading}>{isAdmin?uid:'Chat with Admin'}</Text>
      <GiftedChat
        scrollToBottom={true}
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: currentUserId as string,
        }}
        renderAvatar={null}
      />
    </View>
  );
};

export default ChatBoxScreen;
