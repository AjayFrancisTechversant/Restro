import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Checkbox, TextInput} from 'react-native-paper';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  updateEmail,
  updateRememberedEmail,
  updateRememberedPassword,
  updateRememberMe,
} from '../../Redux/Slices/UserDetailsSlice';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(StaticVariables.EMPTY_STRING);
  const [password, setPassword] = useState(StaticVariables.EMPTY_STRING);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const {rememberMe, rememberedEmail, rememberedPassword} = useAppSelector(
    state => state.userDetails,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const HandleOnChangeText = (text: string, name: 'email' | 'password') => {
    switch (name) {
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    signInusingFirebase();
  };
  const signInusingFirebase = () => {
    setIsLoginLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (isRememberMeChecked) {
          dispatch(updateRememberMe(true));
          dispatch(updateRememberedEmail(email));
          dispatch(updateRememberedPassword(password));
        }
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('Invalid Credentials');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else Alert.alert(error.code);
      })
      .finally(() => setIsLoginLoading(false));
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
              Verify yourself below
            </Text>
            <MyTextInput
              onChangeText={text => HandleOnChangeText(text, 'email')}
              keyboardType="email-address"
              style={screenStyles.textInput}
              label="EMAIL ADDRESS"
            />
            <MyTextInput
              onChangeText={text => HandleOnChangeText(text, 'password')}
              secureTextEntry={!isPasswordVisible ? true : false}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? 'eye' : 'eye-off'}
                  forceTextInputFocus={false}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
              style={screenStyles.textInput}
              label="PASSWORD"
            />
            <View style={screenStyles.rememberMeSuperContainer}>
             {!rememberMe? <View style={screenStyles.rememberMeContainer}>
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
              :
              <TouchableOpacity style={screenStyles.ContinueAsRememberedButton}>
                <Text >Continue as <Text style={commonStyles.boldText}>{rememberedEmail}</Text></Text>
              </TouchableOpacity>
              }
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
                disabled={email && password ? false : true}
                style={{
                  alignSelf: 'center',
                  backgroundColor:
                    email && password
                      ? ColorPalette.red
                      : ColorPalette.lightRed,
                }}>
                {!isLoginLoading ? (
                  <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                    Sign In
                  </Text>
                ) : (
                  <ActivityIndicator color={ColorPalette.white} />
                )}
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
