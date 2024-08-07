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
import {UserDetailsReduxStateType} from '../../Redux/Slices/UserDetailsSlice';
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
    confirmPasswordError: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
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
        if (validate(text, 'password')) {
          setError({...error, passwordError: false});
        } else setError({...error, passwordError: true});
        if (confirmPassword === text) {
          setError({...error, confirmPasswordError: false});
        } else setError({...error, confirmPasswordError: true});
        break;
      case 'confirmPassword':
        setConfirmPassword(text);
        if (password === text) {
          setError({...error, confirmPasswordError: false});
        } else setError({...error, confirmPasswordError: true});
        break;
      default:
        break;
    }
  };
  console.log(error);

  const handleSubmit = () => {
    // validate
    //password save to redux only after veryifying confirm password
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
              errorText={error.passwordError ? '*Invalid Format' : undefined}
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
                error.confirmPasswordError ? '*Doesnt Match' : undefined
              }
              value={confirmPassword}
              onChangeText={text => HandleOnChangeText(text, 'confirmPassword')}
              secureTextEntry={!isConfirmPasswordVisible ? true : false}
              style={screenStyles.textInput}
              label="CONFIRM PASSWORD"
              right={
                <TextInput.Icon
                  icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                  forceTextInputFocus={false}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              }
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
                onPress={handleSubmit}
                // validate and change backgorund color
                style={{
                  backgroundColor: ColorPalette.lightRed,
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
