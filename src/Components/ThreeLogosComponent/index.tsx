import {View, Text, Image} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import randomlogo1 from '../../Assets/Logos/randomlogo1.png';
import randomlogo2 from '../../Assets/Logos/randomlogo2.png';
import randomlogo3 from '../../Assets/Logos/randomlogo3.png';

const ThreeLogosComponent = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.threeLogosContainer}>
      <Image source={randomlogo1} style={screenStyles.imageStyle} />
      <Image source={randomlogo2} style={screenStyles.imageStyle} />
      <Image source={randomlogo3} style={screenStyles.imageStyle} />
    </View>
  );
};

export default ThreeLogosComponent;
