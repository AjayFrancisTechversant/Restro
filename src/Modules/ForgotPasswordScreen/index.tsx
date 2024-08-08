import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState(StaticVariables.EMPTY_STRING);
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
    navigation.navigate(StaticVariables.ChangePasswordScreen as never);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Forgot your Password?
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              No worries, let's reset it...enter your email below, and you'll
              receive a link to reset it
            </Text>
            <MyTextInput
            value={email}
              label="EMAIL"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
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
                disabled={email ? false : true}
                style={{
                  backgroundColor: email
                    ? ColorPalette.red
                    : ColorPalette.lightRed,
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
