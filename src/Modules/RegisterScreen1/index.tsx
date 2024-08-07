import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
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
import styles from './style';

const RegisterScreen1 = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {firstName, lastName, email, mobile} = useAppSelector(
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
  const HandleOnChangeText = (
    text: string,
    name: keyof UserDetailsReduxStateType,
  ) => {
    switch (name) {
      case 'firstName':
        dispatch(updateFirstName(text));
        break;
      case 'lastName':
        dispatch(updateLastName(text));
        break;
      case 'email':
        dispatch(updateEmail(text));
        break;
      case 'mobile':
        dispatch(updateMobile(text));
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    //validate and go to next screen
    navigation.navigate('RegisterScreen2' as never);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent />
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
              value={email}
              onChangeText={text => HandleOnChangeText(text, 'email')}
              style={screenStyles.textInput}
              label="EMAIL"
            />
            <MyTextInput
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
                onPress={() => navigation.navigate('SignInScreen' as never)}
                style={screenStyles.loginButton}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Login
                </Text>
              </MyButton>
            </View>
            <View style={screenStyles.bottomButton}>
              <MyButton
                onPress={handleSubmit}
                style={{
                  backgroundColor: ColorPalette.red,
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
