import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isLength} from 'validator';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import ThreeLogosComponent from '../../Components/Onboarding/ThreeLogosComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  updateCountry,
  updateRegion,
  updateZipcode,
} from '../../Redux/Slices/UserDetailsSlice';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {getLocationDetails} from '../../Services/API/getZipCode';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isZipCodeFetching, setIsZipCodeFetching] = useState(false);
  const zipcodeFromRedux = useAppSelector(state => state.userDetails.zipcode);
  const [isZipcodeValid, setIsZipcodeValid] = useState(
    isLength(zipcodeFromRedux, {min: 6, max: 6}),
  );
  useEffect(() => {
    const backAction = () => {
      if (!navigation.canGoBack()) {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleOnChangeText = (text: string) => {
    dispatch(updateZipcode(text));
    setIsZipcodeValid(isLength(text, {min: 6, max: 6}));
  };
  const handleFetchZipcode = async () => {
    setIsZipCodeFetching(true);
    const locationDetails = await getLocationDetails();
    if (locationDetails) {
      dispatch(updateZipcode(locationDetails.fetchedZipcode));
      dispatch(updateRegion(locationDetails.fetchedRegion));
      dispatch(updateCountry(locationDetails.fetchedCountry));
      setIsZipcodeValid(true);
    }
    setIsZipCodeFetching(false);
  };
  const handleSubmit = () => {
    navigation.navigate(StaticVariables.PreferenceScreen as never);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
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
              errorText={
                !isZipcodeValid && zipcodeFromRedux && !isZipCodeFetching
                  ? '*invalid!'
                  : undefined
              }
              value={zipcodeFromRedux}
              label={!isZipCodeFetching ? 'ZIPCODE' : 'Fetching Zipcode...'}
              style={screenStyles.textInput}
              onChangeText={handleOnChangeText}
              editable={!isZipCodeFetching ? true : false}
              right={
                !isZipCodeFetching ? (
                  <TextInput.Icon
                    onPress={handleFetchZipcode}
                    icon="crosshairs-gps"
                    forceTextInputFocus={false}
                  />
                ) : null
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
                disabled={!isZipcodeValid ? true : false}
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
