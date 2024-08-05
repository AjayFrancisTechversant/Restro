import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import styles from './style';

const SignInScreen = () => {
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
      <Text>SignInScreen</Text>
    </View>
  )
}

export default SignInScreen