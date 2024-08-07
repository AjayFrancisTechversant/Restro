import {View, Text, TouchableOpacity, ColorValue} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

type HeaderComponentPropsType = {
  color: ColorValue;
};

const HeaderComponent:React.FC<HeaderComponentPropsType> = ({color}) => {
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
        <Ionicons name="menu" color={color} size={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <EvilIcons name="user" color={color} size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
