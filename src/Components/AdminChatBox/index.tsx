import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import StaticVariables from '../../Preferences/StaticVariables';
import {MessageType} from '../../Modules/ContactUsScreen';
import AdminChatboxCard from '../AdminChatboxCard';

const AdminChatBox = () => {
  const [messageSets, setMessageSets] = useState<MessageType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .where('toUid', '==', StaticVariables.ADMIN_UID)
      .onSnapshot(querrySnapshot => {
        console.log(querrySnapshot.docs.map((i: any) => i.data()));
      });
    return () => subscriber();
  }, []);
  console.log(messageSets);

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
      <Text>Hey Admin, you have messages from:</Text>
      {/* <FlatList
        data={messagesForAdmin}
        renderItem={({item}) => <AdminChatboxCard messageSets={item} />}
      /> */}
    </View>
  );
};

export default AdminChatBox;
