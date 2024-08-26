import {View, TouchableOpacity, FlatList, Alert, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {SetStateType} from '../../Types/Types';
import StaticVariables from '../../Preferences/StaticVariables';
import {MessageType} from '../../Modules/ContactUsScreen';
import EachMessageComponent from '../EachMessageComponent';
import MyTextInput from '../MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

type AdminChatBoxPropsType = {
  setSelectedEmail: SetStateType<string>;
  selectedEmail: string;
};
const AdminChatBox: React.FC<AdminChatBoxPropsType> = ({
  setSelectedEmail,
  selectedEmail,
}) => {
  const currentUserEmail = auth().currentUser?.email;
  const [messages, setMessages] = useState<MessageType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const flatlisRef = useRef<FlatList>(null);
  const [newMessage, setNewMessage] = useState<MessageType>({
    createdAt: firestore.FieldValue.serverTimestamp(),
    text: StaticVariables.EMPTY_STRING,
    fromEmail: currentUserEmail,
    toEmail: selectedEmail,
  });

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .where(
        Filter.or(
          Filter('fromEmail', '==', selectedEmail),
          Filter('toEmail', '==', selectedEmail),
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
      <TouchableOpacity
        style={screenStyles.backButton}
        onPress={() => setSelectedEmail(StaticVariables.EMPTY_STRING)}>
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>
      <Text style={screenStyles.heading}>{selectedEmail}</Text>
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

export default AdminChatBox;
