import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updateMobile,
  UserDetailsReduxStateType,
} from '../../Redux/Slices/UserDetailsSlice';
import validate from '../../Validation/Validation';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

type ErrorType = {
  firstNameError: boolean;
  lastNameError: boolean;
  emailError: boolean;
  mobileError: boolean;
};

const RegisterScreen1 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {firstName, lastName, email, mobile} = useAppSelector(
    state => state.userDetails,
  );
  const [error, setError] = useState<ErrorType>({
    firstNameError: !validate(firstName, 'required'),
    lastNameError: !validate(lastName),
    emailError: !validate(email, 'email'),
    mobileError: !validate(mobile, 'phone'),
  });
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
    name: keyof UserDetailsReduxStateType,
  ) => {
    switch (name) {
      case 'firstName':
        dispatch(updateFirstName(text));
        setError({...error, firstNameError: !validate(text)});
        break;
      case 'lastName':
        dispatch(updateLastName(text));
        setError({...error, lastNameError: !validate(text)});
        break;
      case 'email':
        dispatch(updateEmail(text));
        setError({...error, emailError: !validate(text, 'email')});
        break;
      case 'mobile':
        dispatch(updateMobile(text));
        setError({...error, mobileError: !validate(text, 'phone')});
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    navigation.navigate(StaticVariables.RegisterScreen2 as never);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Let's get you
              </Text>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                signed up!
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              It'll only take a few seconds...
            </Text>
            <View style={screenStyles.centerContainer}>
              <MyTextInput
                value={firstName}
                onChangeText={text => HandleOnChangeText(text, 'firstName')}
                style={screenStyles.textInput}
                label="FIRST NAME"
              />
              <MyTextInput
                value={lastName}
                onChangeText={text => HandleOnChangeText(text, 'lastName')}
                style={screenStyles.textInput}
                label="LAST NAME"
              />
              <MyTextInput
                errorText={
                  error.emailError && email ? '*Invalid email' : undefined
                }
                value={email}
                keyboardType="email-address"
                onChangeText={text => HandleOnChangeText(text, 'email')}
                style={screenStyles.textInput}
                label="EMAIL"
              />
              <MyTextInput
                errorText={
                  error.mobileError && mobile ? '*Invalid number' : undefined
                }
                value={mobile}
                onChangeText={text => HandleOnChangeText(text, 'mobile')}
                keyboardType="numeric"
                style={screenStyles.textInput}
                label="Mobile"
              />
              <View style={screenStyles.alreadyHaveAccountContainer}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  already have an account?
                </Text>
                <MyButton
                  onPress={() =>
                    navigation.navigate(StaticVariables.SignInScreen as never)
                  }
                  style={screenStyles.loginButton}>
                  <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                    Login
                  </Text>
                </MyButton>
              </View>
            </View>
            <View style={screenStyles.bottomButton}>
              <MyButton
                disabled={
                  !error.emailError &&
                  !error.firstNameError &&
                  !error.lastNameError &&
                  !error.mobileError
                    ? false
                    : true
                }
                onPress={handleSubmit}
                style={{
                  backgroundColor:
                    !error.emailError &&
                    !error.firstNameError &&
                    !error.lastNameError &&
                    !error.mobileError
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

export default RegisterScreen1;
