import {
  View,
  Text,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import validate from '../../Validation/Validation';
import styles from './style';

type ErrorType = {
  passwordError: boolean;
  confirmPasswordError: boolean;
};

const ChangePasswordScreen = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<ErrorType>({
    passwordError: true,
    confirmPasswordError: true,
  });
  const [password, setPassword] = useState(StaticVariables.EMPTY_STRING);
  const [confirmPassword, setConfirmPassword] = useState(
    StaticVariables.EMPTY_STRING,
  );
  const navigation = useNavigation();
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
  const handleSubmit = () => {
    if (!isPasswordChanged) {
      //change logic
      setIsPasswordChanged(true);
    } else navigation.navigate('SignInScreen' as never);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent color={ColorPalette.white}/>
            {!isPasswordChanged ? (
              <>
                <View style={screenStyles.mainTextContainer}>
                  <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                    Change your Password
                  </Text>
                </View>
                <MyTextInput
                  errorText={
                    error.passwordError && password
                      ? '*Invalid Format'
                      : undefined
                  }
                  value={password}
                  onChangeText={text => HandleOnChangeText(text, 'password')}
                  style={screenStyles.textInput}
                  label={'PASSWORD'}
                  secureTextEntry={!isPasswordVisible ? true : false}
                  right={
                    <TextInput.Icon
                      icon={isPasswordVisible ? 'eye' : 'eye-off'}
                      forceTextInputFocus={false}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
                <MyTextInput
                  errorText={
                    error.confirmPasswordError && confirmPassword
                      ? `*Doesn't Match`
                      : undefined
                  }
                  value={confirmPassword}
                  onChangeText={text =>
                    HandleOnChangeText(text, 'confirmPassword')
                  }
                  style={screenStyles.textInput}
                  label={'CONFIRM PASSWORD'}
                  secureTextEntry
                />
              </>
            ) : (
              <View style={screenStyles.box}>
                <Fontisto name="locked" size={50} color={ColorPalette.red} />
                <Text style={[commonStyles.boldText]}>
                  Your password has been reset!
                </Text>
                <Text>Click below to sign in.</Text>
              </View>
            )}
            <View style={screenStyles.bottomButton}>
              <MyButton
                disabled={
                  !error.confirmPasswordError && !error.passwordError
                    ? false
                    : true
                }
                onPress={handleSubmit}
                style={{
                  backgroundColor:
                    !error.confirmPasswordError && !error.passwordError
                      ? ColorPalette.red
                      : ColorPalette.lightRed,
                }}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  {!isPasswordChanged ? 'Change Password' : 'Sign In'}
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
