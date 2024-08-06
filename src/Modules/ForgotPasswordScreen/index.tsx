import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmit = () => {
    ///validate
    navigation.navigate('ChangePasswordScreen' as never);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent />
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Forgot your Password?
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              No worries, let's reset it...enter your email below, and you'll
              receive a link to reset it
            </Text>
            <MyTextInput label="EMAIL" />
            <View style={screenStyles.resendEmailContainer}>
              <Text style={[commonStyles.whiteText]}>
                Didn't receive email?
              </Text>
              <TouchableOpacity style={screenStyles.resendMailButton}>
                <Text
                  style={[
                    commonStyles.whiteText,
                    commonStyles.boldText,
                    commonStyles.underlinedText,
                  ]}>
                  Click to resend
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.checkSpamText]}>
              Also be sure to check your spam folder.
            </Text>

            <View style={screenStyles.bottomButton}>
              <MyButton
                onPress={handleSubmit}
                // validate and change backgorund color
                style={{
                  backgroundColor: ColorPalette.lightRed,
                }}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Next
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
