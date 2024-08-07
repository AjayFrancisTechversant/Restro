import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Checkbox, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyButton from '../../Components/MyButton';
import styles from './style';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmit = () => {
    // validate and ssign in using firebase
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent />
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Sign In
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              verify yourself below
            </Text>
            <MyTextInput style={screenStyles.textInput} label="EMAIL ADDRESS" />
            <MyTextInput
              secureTextEntry={!isPasswordVisible ? true : false}
              right={ <TextInput.Icon
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                forceTextInputFocus={false}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />}
              style={screenStyles.textInput}
              label="PASSWORD"
            />
            <View style={screenStyles.rememberMeSuperContainer}>
              <View style={screenStyles.rememberMeContainer}>
                <Checkbox
                  uncheckedColor={ColorPalette.white}
                  color={ColorPalette.white}
                  status={isRememberMeChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsRememberMeChecked(!isRememberMeChecked)}
                />
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Remember me
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ForgotPasswordScreen' as never)
                }>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={screenStyles.bottomContainer}>
              <View style={screenStyles.dontHaveAccountContainer}>
                <Text style={commonStyles.whiteText}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RegisterScreen1' as never)
                  }>
                  <Text
                    style={[
                      commonStyles.whiteText,
                      commonStyles.boldText,
                      commonStyles.underlinedText,
                    ]}>
                    Create One
                  </Text>
                </TouchableOpacity>
              </View>
              <MyButton
                onPress={handleSubmit}
                // validate and change backgorund color
                style={{
                  alignSelf: 'center',
                  backgroundColor: ColorPalette.lightRed,
                }}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Sign In
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
