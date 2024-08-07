import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import LogoutComponent from '../../Components/LogoutComponent';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import ZipcodeDisplayComponent from '../../Components/ZipcodeDisplayComponent';

const HomeScreen = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  //use SwitchCase for conditionally rendering
  return (
    <ScrollView style={screenStyles.container}>
      <HeaderComponent color={ColorPalette.black} />
      <MySegmentedButtons />
      <ZipcodeDisplayComponent />
      {/* <LogoutComponent /> */}
    </ScrollView>
  );
};

export default HomeScreen;
