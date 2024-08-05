import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const HeaderComponent = () => {
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
      <TouchableOpacity>
        <Ionicons name="menu" color={ColorPalette.white} size={40}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <EvilIcons name="user" color={ColorPalette.white} size={50}/>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
