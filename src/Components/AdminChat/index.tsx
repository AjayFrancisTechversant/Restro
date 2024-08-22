import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { ADMIN_EMAIL } from '@env';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import AdminChatCard from '../AdminChatCard';
import AdminChatBox from '../AdminChatBox';
import styles from './style';

const AdminChat = () => {
  const [fromEmailIds, setFromEmailIds] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [selectedEmail, setSelectedEmail] = useState(
    StaticVariables.EMPTY_STRING,
  );
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .onSnapshot(querrySnapshot => {
        const messages = querrySnapshot.docs.map(docSnapshot =>
          docSnapshot.data(),
        );
        const toAdminMessages = messages.filter(
          i => i.toEmail == ADMIN_EMAIL,
        );
        var tempArrOfFromEmailIds = StaticVariables.EMPTY_ARRAY;
        toAdminMessages.map(i => {
          if (!tempArrOfFromEmailIds.includes(i.fromEmail)) {
            tempArrOfFromEmailIds.push(i.fromEmail);
          }
        });
        setFromEmailIds([...tempArrOfFromEmailIds]);
      })
    return () => subscriber()
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
      {!selectedEmail ? (
        <>
          <Text>Hey Admin, you have messages from:</Text>
          <FlatList
            ListEmptyComponent={
              <Text style={screenStyles.emptyTextStyle}>No one :)</Text>
            }
            data={fromEmailIds}
            renderItem={({item}) => (
              <AdminChatCard
                setSelectedEmail={setSelectedEmail}
                fromEmailId={item}
              />
            )}
          />
        </>
      ) : (
        <AdminChatBox
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
        />
      )}
    </View>
  );
};

export default AdminChat;
