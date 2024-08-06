import {ImageBackground, Image, Text} from 'react-native';
import React from 'react';
import food_bg1 from '../../../Assets/Images/food_bg1.jpg';
import styles from './style';
import {useScreenContext} from '../../../Contexts/ScreenContext';

const FullScreenBGImageBlur = ({children}: any) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <ImageBackground
      blurRadius={7}
      source={food_bg1}
      resizeMode="cover"
      style={screenStyles.image}>
      {children}
    </ImageBackground>
  );
};

export default FullScreenBGImageBlur;
