import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import rupayCard from '../../Assets/Images/rupayCard.png';
import masterCard from '../../Assets/Images/masterCard.png';
import visaCard from '../../Assets/Images/visaCard.png';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import StaticVariables from '../../Preferences/StaticVariables';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import styles from './style';
import MyTextInput from '../../Components/MyTextInput';
import validate from '../../Validation/Validation';
import MyButton from '../../Components/MyButton';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  CardDetailsReduxStateType,
  updateCvv,
  updateExpiry,
  updateName,
  updateNumber,
} from '../../Redux/Slices/CardDetailsSlice';

type ErrorType = {
  numberError: boolean;
  expiryError: boolean;
  cvvError: boolean;
  nameError: boolean;
};

const PaymentInfoScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  //calculate total order price global fn
  const {number, expiry, cvv, name} = useAppSelector(
    state => state.cardDetails,
  );
  const [error, setError] = useState<ErrorType>({
    cvvError: !validate(cvv, 'cvv'),
    expiryError: !validate(expiry),
    nameError: !validate(name),
    numberError: !validate(number, 'cardNumber'),
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
    name: keyof CardDetailsReduxStateType,
  ) => {
    switch (name) {
      case 'number':
        dispatch(updateNumber(text));
        setError({...error, numberError: !validate(text, 'cardNumber')});
        break;
      case 'expiry':
        dispatch(updateExpiry(text));
        setError({...error, expiryError: !validate(text)});
        break;
      case 'cvv':
        dispatch(updateCvv(text));
        setError({...error, cvvError: !validate(text, 'cvv')});
        break;
      case 'name':
        dispatch(updateName(text));
        setError({...error, nameError: !validate(text)});
        break;
      default:
        break;
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            Payment Info
          </Text>
          <ThreeBitsComponent step={2} />
          <MySegmentedButtons nonEditable />
          <View style={screenStyles.lineStyle}></View>
          <Text style={[commonStyles.bigBoldText, screenStyles.hotelName]}>
            HOtel Name
          </Text>
          <Text>
            <Entypo name="location-pin" size={20} />
            HOtel Location
          </Text>
          <View style={screenStyles.orderCard}>
            <Text style={[commonStyles.boldText]}>Order Total: $ 0.00</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(StaticVariables.OrderScreen)}>
              <Text style={[commonStyles.redText, commonStyles.boldText]}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
          <View style={screenStyles.atmCardsContainer}>
            <Image source={rupayCard} style={screenStyles.cardImageStyle} />
            <Image source={masterCard} style={screenStyles.cardImageStyle} />
            <Image source={visaCard} style={screenStyles.cardImageStyle} />
          </View>
          <MyTextInput
            value={number}
            errorText={error.numberError && number ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'number')}
            label="CARD NUMBER"
            keyboardType="numeric"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={expiry}
            errorText={error.expiryError && expiry ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'expiry')}
            label="EXPIRY"
            keyboardType="numeric"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={cvv}
            errorText={error.cvvError && cvv ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'cvv')}
            keyboardType="numeric"
            label="CVV"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={name}
            errorText={error.nameError && name ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'name')}
            label="NAME ON CARD"
            style={screenStyles.textInput}
          />
          <MyButton
            disabled={
              !error.numberError &&
              !error.cvvError &&
              !error.expiryError &&
              !error.nameError
                ? false
                : true
            }
            onPress={() => navigation.navigate(StaticVariables.SummaryScreen)}
            style={[
              screenStyles.bottomButton,
              {
                backgroundColor:
                  !error.numberError &&
                  !error.cvvError &&
                  !error.expiryError &&
                  !error.nameError
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

export default PaymentInfoScreen;
