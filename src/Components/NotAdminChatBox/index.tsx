import {View, FlatList, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import {ADMIN_EMAIL} from '@env';
import React, {useEffect, useRef, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {MessageType} from '../../Modules/ContactUsScreen';
import EachMessageComponent from '../EachMessageComponent';
import styles from './style';

const NotAdminChatBox = () => {
  const currentUserEmail = auth().currentUser?.email;
  const [newMessage, setNewMessage] = useState<MessageType>({
    createdAt: firestore.FieldValue.serverTimestamp(),
    text: StaticVariables.EMPTY_STRING,
    fromEmail: currentUserEmail,
    toEmail: ADMIN_EMAIL,
  });
  const [messages, setMessages] = useState<MessageType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const flatlisRef = useRef<FlatList>(null);
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
      .where(
        Filter.or(
          Filter('fromEmail', '==', currentUserEmail),
          Filter('toEmail', '==', currentUserEmail),
        ),
      )
      .onSnapshot(querrySnapshot => {
        const sortedMessages: any = querrySnapshot?.docs
          .map(i => i.data())
          .sort((a, b) => a.createdAt - b.createdAt);
        setMessages(sortedMessages);
      });
    return () => subscriber();
  }, []);
  
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
      <FlatList
        onContentSizeChange={() => flatlisRef.current?.scrollToEnd()}
        ref={flatlisRef}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={({item}) => <EachMessageComponent message={item} />}
      />
      <MyTextInput
        value={newMessage.text}
        multiline
        style={screenStyles.textInput}
        onChangeText={txt => setNewMessage({...newMessage, text: txt})}
        right={
          <TextInput.Icon
            forceTextInputFocus={false}
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
