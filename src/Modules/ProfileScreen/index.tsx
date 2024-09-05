import {
  View,
  Text,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {FC} from 'react';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import profilePicDummy from '../../Assets/Images/profilePicDummy.jpg';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HeaderComponent from '../../Components/HeaderComponent';
import styles from './style';

const ProfileScreen: FC = () => {
  const CurrentUserDetails = auth().currentUser;
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
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
      <HeaderComponent color={ColorPalette.gray} inProfileScreen/>
      <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
        Profile
      </Text>
      <View style={screenStyles.detailsContainer}>
        <Image source={profilePicDummy} style={screenStyles.imageStyle} />
        <Text
          style={[
            commonStyles.bigBoldText,
            screenStyles.heading,
            commonStyles.whiteText,
          ]}>
          Details
        </Text>
        <Text style={commonStyles.whiteText}>
          Email: {CurrentUserDetails?.email}
        </Text>
        <Text style={commonStyles.whiteText}>
          Uid: {CurrentUserDetails?.uid}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
