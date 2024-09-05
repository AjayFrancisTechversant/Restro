import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HomeStack from './HomeStack';
import ContactUsScreen from '../../Modules/ContactUsScreen';
import OrderStack from './OrderStack';
import ProfileScreen from '../../Modules/ProfileScreen';

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
          unmountOnBlur: true,
          drawerIcon: () => (
            <Entypo name="home" color={ColorPalette.red} size={20} />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          title: 'My order',
          unmountOnBlur: true,
          drawerIcon: () => (
            <FontAwesome6
              name="cart-shopping"
              color={ColorPalette.red}
              size={20}
            />
          ),
        }}
        name="OrderStack"
        component={OrderStack}
      />
      <Drawer.Screen
        options={{
          title: 'Contact Us',
          unmountOnBlur: true,
          drawerIcon: () => (
            <Entypo name="chat" color={ColorPalette.red} size={20} />
          ),
        }}
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
      <Drawer.Screen
        options={{
          title: 'My profile',
          unmountOnBlur: true,
          drawerIcon: () => (
            <FontAwesome name="user" color={ColorPalette.red} size={20} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
};

export default AuthorizedStack;
