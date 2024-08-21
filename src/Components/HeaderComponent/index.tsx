import {View, TouchableOpacity, ColorValue} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

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
        <FontAwesome name="user" color={color} size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
