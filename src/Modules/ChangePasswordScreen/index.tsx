import {
  View,
  Text,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState} from 'react';
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
import styles from './style';

const ChangePasswordScreen = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
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
            <HeaderComponent />
            {!isPasswordChanged ? (
              <>
                <View style={screenStyles.mainTextContainer}>
                  <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                    Change your Password
                  </Text>
                </View>
                <MyTextInput
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
                  style={screenStyles.textInput}
                  label={'CONFIRM PASSWORD'}
                  secureTextEntry={!isConfirmPasswordVisible ? true : false}
                  right={
                    <TextInput.Icon
                      icon={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
                      forceTextInputFocus={false}
                      onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    />
                  }
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
                onPress={handleSubmit}
                // validate and change backgorund color
                style={{
                  backgroundColor: ColorPalette.lightRed,
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
