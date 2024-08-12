import {View, Text, FlatList, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import {TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {MessageType} from '../../Modules/ContactUsScreen';
import EachMessageComponent from '../EachMessageComponent';
import styles from './style';

const NotAdminChatBox = () => {
  const currentUserId = auth().currentUser?.uid;
  const [newMessage, setNewMessage] = useState<MessageType>({
    createdAt: firestore.FieldValue.serverTimestamp(),
    text: StaticVariables.EMPTY_STRING,
    fromUid: currentUserId,
    toUid: StaticVariables.ADMIN_UID,
  });
  const [messages, setMessages] = useState<MessageType[]>(
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
      .collection('messages')
      .where('fromUid', '==', currentUserId)
      // .orderBy('createdAt', 'asc')
      .onSnapshot(documentSnapshot => {
        // console.log(documentSnapshot);
        const sortedMessages: any = documentSnapshot?.docs
          .map(i => i.data())
          .sort((a, b) => a.createdAt - b.createdAt);
        setMessages(sortedMessages);
      });
    return () => subscriber();
  }, [currentUserId]);

  const handleSendMessage = () => {
    setNewMessage({
      ...newMessage,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    firestore()
      .collection('messages')
      .add(newMessage)
      .then(() => {
        setNewMessage({
          ...newMessage,
          text: StaticVariables.EMPTY_STRING,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch(error => Alert.alert(error));
  };
  return (
    <View style={screenStyles.container}>
      <Text>NotAdminChatBox</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={({item}) => <EachMessageComponent message={item} />}
      />
      <MyTextInput
        value={newMessage.text}
        style={screenStyles.textInput}
        onChangeText={txt => setNewMessage({...newMessage, text: txt})}
        right={
          <TextInput.Icon
            disabled={!newMessage.text}
            icon="send"
            color={ColorPalette.blue}
            onPress={handleSendMessage}
          />
        }
      />
    </View>
  );
};

export default NotAdminChatBox;
