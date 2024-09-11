import {View, Text, FlatList} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import AdminChatCard from '../../Components/AdminChatCard';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HeaderComponent from '../../Components/HeaderComponent';
import styles from './style';

const AdminChatScreen:FC = () => {
  const [users, setUsers] = useState<any[]>(StaticVariables.EMPTY_ARRAY);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .onSnapshot(querrySnapshot => {
        const data = querrySnapshot.docs.map(docSnapshot => docSnapshot.id);
        setUsers(data);
      });
    return () => subscriber();
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
      <Text>Hey Admin, you have messages from:</Text>
      <FlatList
        ListEmptyComponent={
          <Text style={screenStyles.emptyTextStyle}>No one :)</Text>
        }
        data={users}
        renderItem={({item}) => <AdminChatCard email={item} />}
      />
    </View>
  );
};

export default AdminChatScreen;
