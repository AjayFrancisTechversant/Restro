import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import HeaderComponent from '../../Components/HeaderComponent';
import {Checkbox, TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyButton from '../../Components/MyButton';
import styles from './style';
import StaticVariables from '../../Preferences/StaticVariables';
import validate from '../../Validation/Validation';

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    // register email auth firebase
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent />
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
                {height: screenContext.height * 0.1},
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
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Register
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen2;
