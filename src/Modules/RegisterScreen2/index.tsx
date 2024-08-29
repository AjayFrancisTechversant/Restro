import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import {Checkbox, TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';
import validate from '../../Validation/Validation';
import {useAppSelector} from '../../hooks/hooks';
import styles from './style';

type ErrorType = {
  passwordError: boolean;
  confirmPasswordError: boolean;
};

const RegisterScreen2 = () => {
  const [isUpdatesChecked, setIsUpdatesChecked] = useState(false);
  const [isTandCChecked, setIsTandCChecked] = useState(false);
  const [password, setPassword] = useState(StaticVariables.EMPTY_STRING);
  const [confirmPassword, setConfirmPassword] = useState(
    StaticVariables.EMPTY_STRING,
  );
  const [error, setError] = useState<ErrorType>({
    passwordError: true,
    confirmPasswordError: true,
  });
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailFromRedux = useAppSelector(state => state.userDetails.email);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const HandleOnChangeText = (
    text: string,
    name: 'password' | 'confirmPassword',
  ) => {
    switch (name) {
      case 'password':
        setPassword(text);
        setError({
          passwordError: !validate(text, 'password'),
          confirmPasswordError: !(text === confirmPassword),
        });
        break;
      case 'confirmPassword':
        setConfirmPassword(text);
        setError({...error, confirmPasswordError: !(text === password)});
        break;
      default:
        break;
    }
  };
  const signUpUsingFirebase = () => {
    setIsRegisterLoading(true);
    auth()
      .createUserWithEmailAndPassword(emailFromRedux, password)
      .then(() => {})
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else Alert.alert(error.code);
      })
      .finally(() => setIsRegisterLoading(false));
  };
  const handleSubmit = () => {
    signUpUsingFirebase();
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Security is
              </Text>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                important...
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              Enter a password below
            </Text>
            <View style={screenStyles.centerContainer}>
              <MyTextInput
                errorText={
                  error.passwordError && password ? '*Invalid Format' : undefined
                }
                value={password}
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
              <MyTextInput
                errorText={
                  error.confirmPasswordError && confirmPassword
                    ? `*Doesn't Match`
                    : undefined
                }
                value={confirmPassword}
                onChangeText={text => HandleOnChangeText(text, 'confirmPassword')}
                secureTextEntry={true}
                style={screenStyles.textInput}
                label="CONFIRM PASSWORD"
              />
              <View style={screenStyles.checkBoxContainer}>
                <Checkbox
                  uncheckedColor={ColorPalette.white}
                  color={ColorPalette.white}
                  status={isUpdatesChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsUpdatesChecked(!isUpdatesChecked)}
                />
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Keep me up-to-date with offers by email
                </Text>
              </View>
              <View
                style={[
                  screenStyles.checkBoxContainer,
                  // {height: screenContext.height * 0.1},
                ]}>
                <Checkbox
                  uncheckedColor={ColorPalette.white}
                  color={ColorPalette.white}
                  status={isTandCChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsTandCChecked(!isTandCChecked)}
                />
                <Text
                  style={[
                    commonStyles.whiteText,
                    commonStyles.boldText,
                    screenStyles.longText,
                  ]}>
                  By Clicking Register,, you agree to the Terms & Conditions set
                  out by this site, including our cookie Use
                </Text>
              </View>
            </View>
            <View style={screenStyles.bottomButton}>
              <MyButton
                disabled={
                  !error.confirmPasswordError &&
                  !error.passwordError &&
                  isTandCChecked
                    ? false
                    : true
                }
                onPress={handleSubmit}
                style={{
                  backgroundColor:
                    !error.confirmPasswordError &&
                    !error.passwordError &&
                    isTandCChecked
                      ? ColorPalette.red
                      : ColorPalette.lightRed,
                }}>
                {!isRegisterLoading ? (
                  <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                    Register
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

export default RegisterScreen2;
