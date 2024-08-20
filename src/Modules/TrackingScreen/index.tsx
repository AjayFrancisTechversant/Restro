import {View, Text} from 'react-native';
import React, { FC } from 'react';
import { useScreenContext } from '../../Contexts/ScreenContext';
import styles from './style';

const TrackingScreen:FC = () => {
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
      <Text>TrackingScreen</Text>
    </View>
  );
};

export default TrackingScreen;
