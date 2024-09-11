import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ADMIN_UID} from '@env';
import auth from '@react-native-firebase/auth';
import ChatBoxScreen from '../../Modules/ChatBoxScreen';
import AdminChatScreen from '../../Modules/AdminChatScreen';

export type ContactUsStackParamsList = {
  AdminChatScreen: undefined;
  ChatBoxScreen: {email: string};
};
const Stack = createNativeStackNavigator<ContactUsStackParamsList>();

const ContactUsStack = () => {
  const currentUserId = auth().currentUser?.uid;
  const currentUserEmail = auth().currentUser?.email;
  const isAdmin = currentUserId == ADMIN_UID;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAdmin ? (
        <>
          <Stack.Screen name="AdminChatScreen" component={AdminChatScreen} />
          <Stack.Screen name="ChatBoxScreen" component={ChatBoxScreen} />
        </>
      ) : (
        <Stack.Screen name="ChatBoxScreen"
        initialParams={currentUserEmail?{email:currentUserEmail}:{email:undefined}}
        component={ChatBoxScreen} />
      )}
    </Stack.Navigator>
  );
};

export default ContactUsStack;
