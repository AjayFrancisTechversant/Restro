import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
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

type cardDetailsType = {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
};
type ErrorType = {
  numberError: boolean;
  expiryError: boolean;
  cvvError: boolean;
  nameError: boolean;
};

const PaymentInfoScreen = () => {
  const navigation: any = useNavigation();
  //calculate total order price global fn
  const [cardDetails, setCardDetails] = useState<cardDetailsType>({
    number: StaticVariables.EMPTY_STRING,
    cvv: StaticVariables.EMPTY_STRING,
    expiry: StaticVariables.EMPTY_STRING,
    name: StaticVariables.EMPTY_STRING,
  });
  const [error, setError] = useState<ErrorType>({
    cvvError: true,
    expiryError: true,
    nameError: true,
    numberError: true,
  });
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const HandleOnChangeText = (text: string, name: keyof cardDetailsType) => {
    switch (name) {
      case 'number':
        setCardDetails({...cardDetails, number: text});
        setError({...error, numberError: !validate(text)});
        break;
      case 'expiry':
        setCardDetails({...cardDetails, expiry: text});
        // setError({...error, lastNameError: !validate(text)});
        break;
      case 'cvv':
        setCardDetails({...cardDetails, cvv: text});
        // setError({...error, emailError: !validate(text, 'email')});
        break;
      case 'name':
        setCardDetails({...cardDetails, name: text});
        // setError({...error, mobileError: !validate(text, 'phone')});
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={screenStyles.container}>
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
        onChangeText={text => HandleOnChangeText(text, 'number')}
        label="CARD NUMBER"
        keyboardType="numeric"
        style={screenStyles.textInput}
      />
      <View style={screenStyles.expAndCvvContainer}>
        <MyTextInput
          onChangeText={text => HandleOnChangeText(text, 'expiry')}
          label="EXPIRY"
          keyboardType="numeric"
          style={screenStyles.textInput}
        />
        <MyTextInput
          onChangeText={text => HandleOnChangeText(text, 'cvv')}
          keyboardType="numeric"
          label="CVV"
          style={screenStyles.textInput}
        />
      </View>
      <MyTextInput
        onChangeText={text => HandleOnChangeText(text, 'name')}
        label="NAME ON CARD"
        style={screenStyles.textInput}
      />
    </ScrollView>
  );
};

export default PaymentInfoScreen;
