import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HomeStack from './HomeStack';
import ContactUsScreen from '../../Modules/ContactUsScreen';

// type AuthorizedStackParamList = {
//   HomeStack: undefined;
//   ContactUsScreen: undefined;
// };

const Drawer = createDrawerNavigator();

const AuthorizedStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerActiveTintColor: ColorPalette.red,
      }}>
      <Drawer.Screen
        options={{
          title: 'Home',
          drawerIcon: () => (
            <Entypo name="home" color={ColorPalette.red} size={20} />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          title: 'Contact Us',
          drawerIcon: () => (
            <Entypo name="chat" color={ColorPalette.red} size={20} />
          ),
        }}
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
    </Drawer.Navigator>
  );
};

export default AuthorizedStack;
