import {View, Text, TouchableOpacity, ColorValue} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useNavigation} from '@react-navigation/native';
import StaticVariables from '../../Preferences/StaticVariables';

type HeaderComponentPropsType = {
  color: ColorValue;
};

const HeaderComponent: React.FC<HeaderComponentPropsType> = ({color}) => {
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.iconsContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={color} size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(StaticVariables.ProfileScreen as never)
        }>
        <EvilIcons name="user" color={color} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
