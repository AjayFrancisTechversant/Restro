import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const LoadingComponent = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      collapsable={false}>
      <View style={screenStyles.centeredView}>
        <ActivityIndicator size={50} color={ColorPalette.red} />
      </View>
    </Modal>
  );
};

export default LoadingComponent;
