import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import styles from './Style';
import { BlurView } from '@react-native-community/blur';
import food_bg1 from '../../Assets/Images/food_bg1.jpg'

const WelcomeScreen = () => {
    const screenContext = useScreenContext();
    const screenStyles = styles(
      screenContext.isPortrait ? screenContext.height : screenContext.width,
      screenContext.isPortrait ? screenContext.width : screenContext.height,
      screenContext.isPortrait,
      screenContext.isTypeTablet,
      screenContext,
    );
  return (
    <View>
      <BlurView >
        <ImageBackground source={food_bg1} resizeMode='cover' style={{flex:1}}/>
      </BlurView>
      <Text>WelcomeScreen</Text>
    </View>
  )
}

export default WelcomeScreen