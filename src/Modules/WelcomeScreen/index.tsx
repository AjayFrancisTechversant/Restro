import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isLength} from 'validator';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import ThreeLogosComponent from '../../Components/Onboarding/ThreeLogosComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateZipcode} from '../../Redux/Slices/UserDetailsSlice';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './Style';
import {getZipCode} from '../../Services/API/getZipCode';

const WelcomeScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [isZipCodeFetching, setIsZipCodeFetching] = useState(false);
  const zipcodeFromRedux = useAppSelector(state => state.userDetails.zipcode);
  const [isZipcodeValid, setIsZipcodeValid] = useState(
    isLength(zipcodeFromRedux, {min: 6, max: 6}),
  );
  const handleOnChangeText = (text: string) => {
    dispatch(updateZipcode(text));
    setIsZipcodeValid(isLength(text, {min: 6, max: 6}));
  };
  const handleFetchZipcode = async () => {
    setIsZipCodeFetching(true);
    const fetchedZipcode = await getZipCode();
    dispatch(updateZipcode(fetchedZipcode))
    setIsZipCodeFetching(false)
  };
  const handleSubmit = () => {
    if (isZipcodeValid) {
      navigation.navigate('PreferenceScreen');
    } else {
      Alert.alert('Invalid Zipcode!!!');
    }
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <HeaderComponent />
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                Hungry?
              </Text>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                We gotcha
              </Text>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                covered.
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              Let's find the locations near you.
            </Text>
            <MyTextInput
              value={zipcodeFromRedux}
              label={'ZIPCODE'}
              style={screenStyles.textInput}
              onChangeText={handleOnChangeText}
              right={
                <TextInput.Icon
                  onPress={handleFetchZipcode}
                  icon="crosshairs-gps"
                  forceTextInputFocus={false}
                />
              }
              keyboardType="numeric"
            />
            <ThreeLogosComponent />
            <View style={screenStyles.bottomButtonsContainer}>
              <MyButton style={screenStyles.button1}>
                <AntDesign name="qrcode" color={ColorPalette.white} size={20} />
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  I'm At My Table
                </Text>
              </MyButton>
              <MyButton
                onPress={handleSubmit}
                style={{
                  backgroundColor: isZipcodeValid
                    ? ColorPalette.red
                    : ColorPalette.lightRed,
                }}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Lets Go!
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;
