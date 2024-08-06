import {View, Text} from 'react-native';
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
          enter a password below
        </Text>
        <MyTextInput
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          style={screenStyles.textInput}
          label="PASSWORD"
        />
        <MyTextInput
          secureTextEntry
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
            By Clicking Register,, you agree to the Terms & Conditions set out
            by this site, including our cookie Use
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
  );
};

export default RegisterScreen2;
