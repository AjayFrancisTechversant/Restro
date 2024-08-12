import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import {MessageType} from '../../Modules/ContactUsScreen';
import AdminChatCard from '../AdminChatCard';
import AdminChatBox from '../AdminChatBox';
import styles from './style';

const AdminChat = () => {
  const currentUserId = auth().currentUser?.uid;
  const [fromEmailIds, setFromEmailIds] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [selectedEmail, setSelectedEmail] = useState(
    StaticVariables.EMPTY_STRING,
  );
  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .where('toEmail', '==', StaticVariables.ADMIN_Email)
      .onSnapshot(querrySnapshot => {
        var tempArrOfFromEmailIds = StaticVariables.EMPTY_ARRAY;
        querrySnapshot.docs
          .map((i: any) => i.data())
          .map((i: MessageType) => {
            if (!tempArrOfFromEmailIds.includes(i.fromEmail)) {
              tempArrOfFromEmailIds.push(i.fromEmail);
            }
          });
        setFromEmailIds(tempArrOfFromEmailIds);
      });
    return () => subscriber();
  }, [currentUserId]);

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
          <FlatList ListEmptyComponent={<Text>No one</Text>}
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
