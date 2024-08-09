import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const MenuScreen = ({route}: any) => {
   const {hotel}=route.params
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  console.log(hotel);

  return (
    <View style={screenStyles.container}>
        <HeaderComponent color={ColorPalette.gray}/>
      <Text>MenuScreen</Text>
    </View>
  );
};

export default MenuScreen;
