import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';

const EditZipcodeScreen = () => {
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
      <View style={screenStyles.mainTextContainer}>
        <Text style={[screenStyles.bigText]}>Ok, what's the</Text>
        <Text style={[screenStyles.bigText]}>correct zip?</Text>
      </View>
    </View>
  );
};

export default EditZipcodeScreen;
