import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import restroAppIcon_round from '../../Assets/Images/restroAppIcon_round.png';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const InitializingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={restroAppIcon_round} style={styles.imageStyle} />
    </View>
  );
};

export default InitializingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.white,
  },
  imageStyle: {height: 200, width: 200},
});
