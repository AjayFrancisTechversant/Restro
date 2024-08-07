import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyTextInput from '../../Components/MyTextInput';
import HeaderComponent from '../../Components/HeaderComponent';
import {Checkbox, TextInput} from 'react-native-paper';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyButton from '../../Components/MyButton';

const RegisterScreen2 = () => {
  const [isUpdatesChecked, setIsUpdatesChecked] = useState(false);
  const [isTandCChecked, setIsTandCChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmit = () => {
    // validate
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
              secureTextEntry={!isConfirmPasswordVisible ? true : false}
              style={screenStyles.textInput}
              label="CONFIRM PASSWORD"
              right={
                <TextInput.Icon
                  icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                  forceTextInputFocus={false}
                  onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
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
