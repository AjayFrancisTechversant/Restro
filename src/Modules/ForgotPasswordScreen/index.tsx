import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import styles from './style';

const ForgotPasswordScreen = () => {
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
      <Text>ForgotPasswordScreen</Text>
    </View>
  )
}

export default ForgotPasswordScreen