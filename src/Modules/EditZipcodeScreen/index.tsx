import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {FC, useState} from 'react';
import {isLength} from 'validator';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch} from '../../hooks/hooks';
import MyTextInput from '../../Components/MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import {getLocationDetails} from '../../Services/API/getZipCode';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import {
  updateCountry,
  updateRegion,
  updateZipcode,
} from '../../Redux/Slices/UserDetailsSlice';
import styles from './style';

type LocationDetailsType = {
  zipCode: string;
  region: string;
  country: string;
};
const EditZipcodeScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [locationDetails, setLocationDetails] = useState<LocationDetailsType>({
    country: StaticVariables.EMPTY_STRING,
    region: StaticVariables.EMPTY_STRING,
    zipCode: StaticVariables.EMPTY_STRING,
  });
  const [isZipCodeFetching, setIsZipCodeFetching] = useState(false);
  const [isZipcodeValid, setIsZipcodeValid] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleOnChangeText = (text: string) => {
    setLocationDetails({...locationDetails, zipCode: text});
    setIsZipcodeValid(isLength(text, {min: 6, max: 6}));
  };
  const handleFetchZipcode = async () => {
    setIsZipCodeFetching(true);
    const response = await getLocationDetails();
    setLocationDetails({
      country: response?.fetchedCountry,
      region: response?.fetchedRegion,
      zipCode: response?.fetchedZipcode,
    });
    setIsZipcodeValid(true);
    setIsZipCodeFetching(false);
  };
  const handleSubmit = () => {
    dispatch(updateZipcode(locationDetails.zipCode));
    dispatch(updateRegion(locationDetails.region));
    dispatch(updateCountry(locationDetails.country));
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={screenStyles.container}>
          <View>
            <HeaderComponent color={ColorPalette.gray} />
            <View style={screenStyles.mainTextContainer}>
              <Text style={[screenStyles.bigText]}>Ok, what's the</Text>
              <Text style={[screenStyles.bigText]}>correct zip?</Text>
            </View>
            <MyTextInput
              errorText={
                !isZipcodeValid && locationDetails.zipCode && !isZipCodeFetching
                  ? 'invalid!'
                  : undefined
              }
              value={locationDetails.zipCode}
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
            <View style={screenStyles.coolTipContainer}>
              <Text>
                <Text style={commonStyles.boldText}>Cool Tip: </Text>Click on
                the icon above to use your current location
              </Text>
            </View>
          </View>
          <MyButton
            disabled={!isZipcodeValid ? true : false}
            onPress={handleSubmit}
            style={[
              screenStyles.bottomButton,
              {
                backgroundColor: isZipcodeValid
                  ? ColorPalette.red
                  : ColorPalette.lightRed,
              },
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              Ok, Done
            </Text>
          </MyButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditZipcodeScreen;
