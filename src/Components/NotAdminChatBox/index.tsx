import {ActivityIndicator, Alert, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {arrayUnion, Filter} from '@react-native-firebase/firestore';
import {ADMIN_EMAIL} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

const NotAdminChatBox = () => {
  const currentUserId = auth().currentUser?.uid;
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
      .doc(currentUserId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
        const resData: any = documentSnapshot.data()
        const sorted = resData?.messages?.sort((a: any, b: any) => b.createdAt - a.createdAt)
          setMessages(sorted);
        }
      });
    return () => subscriber();
  }, []);
  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('Chats')
  //     .doc(isAdmin ? userID : currentUid)
  //     .onSnapshot(documentSnapshot => {
  //       const resData: any = documentSnapshot.data()
  //       const filtered = resData?.messages?.sort((a: any, b: any) => b.createdAt - a.createdAt)
  //       setAllRequest(filtered)
  //     });
  //   return () => {
  //     subscriber()
  //   };
  // }, []);
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
        await firestore().collection('chats').doc(currentUserId).get()
      ).exists;
      if (!isDocExisting) {
        //create a new array
        await firestore()
          .collection('chats')
          .doc(currentUserId)
          .set({messages: arrayUnion(formattedNewMessage)});
      } else {
        //push into array
        await firestore()
          .collection('chats')
          .doc(currentUserId)
          .update({messages: arrayUnion(formattedNewMessage)});
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <GiftedChat
      scrollToBottom={true}
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: currentUserId as string,
      }}
      renderAvatar={null}
    />
  );
};

export default NotAdminChatBox;
