import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import LogoutComponent from '../../Components/LogoutComponent';
import styles from './style';

const ProfileScreen: FC = () => {
  const navigation = useNavigation();
  const CurrentUserDetails = auth().currentUser;
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
      <TouchableOpacity
        style={screenStyles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>
      <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
        Profile
      </Text>
      <View style={screenStyles.logoutButton}>
        <LogoutComponent />
      </View>
      <View style={screenStyles.detailsContainer}>
        <Text
          style={[
            commonStyles.bigBoldText,
            screenStyles.heading,
            commonStyles.whiteText,
          ]}>
          Details
        </Text>
        <Text style={commonStyles.whiteText}>Email: {CurrentUserDetails?.email}</Text>
        <Text style={commonStyles.whiteText}>Uid: {CurrentUserDetails?.uid}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
