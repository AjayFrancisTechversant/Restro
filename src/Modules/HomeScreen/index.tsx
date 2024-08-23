import {Alert, BackHandler, FlatList, Text} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import ZipcodeDisplayComponent from '../../Components/ZipcodeDisplayComponent';
import HotelsContainer from '../../Components/HotelsContainer';
import styles from './style';

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    const backAction = () => {
      if (!navigation.canGoBack()) {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <FlatList
    showsVerticalScrollIndicator={false}
      style={screenStyles.container}
      ListHeaderComponent={
        <>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={screenStyles.title}>RESTRO</Text>
          <MySegmentedButtons />
          <ZipcodeDisplayComponent />
        </>
      }
      data={['']}
      renderItem={() => <HotelsContainer />}
      contentContainerStyle={screenStyles.contentContainerStyle}
    />
  );
};

export default HomeScreen;
