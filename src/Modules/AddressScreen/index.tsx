import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import StaticVariables from '../../Preferences/StaticVariables';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  AddressDetailsReduxStateType,
  updateAddress,
  updateCity,
  updateState,
  updateZipCode,
} from '../../Redux/Slices/AddressDetailsSlice';
import validate from '../../Validation/Validation';
import styles from './style';
import {TextInput} from 'react-native-paper';
import {getLocationDetails} from '../../Services/API/getZipCode';

type ErrorType = {
  addressError: boolean;
  cityError: boolean;
  stateError: boolean;
  zipcodeError: boolean;
};

const AddressScreen: FC = () => {
  const dispatch = useAppDispatch();
  const {address, city, state, zipcode} = useAppSelector(
    state => state.addressDetails,
  );
  const [isZipCodeFetching, setIsZipCodeFetching] = useState(false);
  const [error, setError] = useState<ErrorType>({
    addressError: !validate(address),
    cityError: !validate(city),
    stateError: !validate(state),
    zipcodeError: !validate(zipcode, 'zipcode'),
  });
  const navigation: any = useNavigation();
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
    name: keyof AddressDetailsReduxStateType,
  ) => {
    switch (name) {
      case 'address':
        dispatch(updateAddress(text));
        setError({...error, addressError: !validate(text)});
        break;
      case 'city':
        dispatch(updateCity(text));
        setError({...error, cityError: !validate(text)});
        break;
      case 'state':
        dispatch(updateState(text));
        setError({...error, stateError: !validate(text)});
        break;
      case 'zipcode':
        dispatch(updateZipCode(text));
        setError({...error, zipcodeError: !validate(text, 'zipcode')});
        break;
      default:
        break;
    }
  };
  const handleFetchZipcode = async () => {
    setIsZipCodeFetching(true);
    const locationDetails = await getLocationDetails();
    if (locationDetails) {
      dispatch(updateZipCode(locationDetails.fetchedZipcode));
      setError({
        ...error,
        zipcodeError: !validate(locationDetails.fetchedZipcode, 'zipcode'),
      });
    }
    setIsZipCodeFetching(false);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            Address Details
          </Text>
          <ThreeBitsComponent step={1} />
          <MySegmentedButtons nonEditable />
          <View style={screenStyles.lineStyle}></View>
          <View style={screenStyles.bigContainer}>
            <Entypo name="location-pin" color={ColorPalette.red} size={60} />
            <View style={commonStyles.flexShrinkOne}>
              <Text style={commonStyles.redTextBoldXL}>
                What's your address?
              </Text>
              <Text style={commonStyles.boldText}>
                Let us know where to knock.
              </Text>
            </View>
          </View>
          <MyTextInput
            value={address}
            errorText={
              error.addressError && address ? '*Invalid Address' : undefined
            }
            onChangeText={text => HandleOnChangeText(text, 'address')}
            label="Address"
            multiline
            numberOfLines={3}
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={city}
            errorText={error.cityError && city ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'city')}
            label="City"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={state}
            errorText={error.stateError && state ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'state')}
            label="State"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={zipcode}
            keyboardType="numeric"
            errorText={error.zipcodeError && zipcode ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'zipcode')}
            label={!isZipCodeFetching ? 'ZIPCODE' : 'Fetching Zipcode...'}
            editable={!isZipCodeFetching ? true : false}
            style={screenStyles.textInput}
            right={
              !isZipCodeFetching ? (
                <TextInput.Icon
                  onPress={handleFetchZipcode}
                  icon="crosshairs-gps"
                  forceTextInputFocus={false}
                />
              ) : null
            }
          />
          <MyButton
            disabled={
              !error.addressError &&
              !error.cityError &&
              !error.stateError &&
              !error.zipcodeError
                ? false
                : true
            }
            onPress={() =>
              navigation.navigate(StaticVariables.PaymentInfoScreen)
            }
            style={[
              screenStyles.bottomButton,
              {
                backgroundColor:
                  !error.addressError &&
                  !error.cityError &&
                  !error.stateError &&
                  !error.zipcodeError
                    ? ColorPalette.red
                    : ColorPalette.lightRed,
              },
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              Next
            </Text>
          </MyButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
