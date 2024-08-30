import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
import {OrderType} from '../OrderScreen';
import {getTotalPrice} from '../../Services/API/getTotalPrice';
import styles from './style';

type ErrorType = {
  numberError: boolean;
  expiryError: boolean;
  cvvError: boolean;
  nameError: boolean;
};

const PaymentInfoScreen: FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const {number, expiry, cvv, name} = useAppSelector(
    state => state.cardDetails,
  );
  const currentUserId = auth().currentUser?.uid;
  const [order, setOrder] = useState<OrderType>();
  const [totalPrice, setTotalPrice] = useState(0);
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
  useEffect(() => {
    fecthOrder();
  }, []);

  const fecthOrder = async () => {
    try {
      const docSnapshot: any = await firestore()
        .collection('orders')
        .doc(currentUserId)
        .get();
      setOrder(docSnapshot.data());
      if (currentUserId) {
        const totalprice = await getTotalPrice(currentUserId);
        if (totalprice) {
          setTotalPrice(totalprice + totalprice * 0.1 + 2);
        }
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
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
        if (text.length > 5) {
          return;
        }
        if (text.length === 2 && expiry.length === 1) {
          text += '/';
        }
        dispatch(updateExpiry(text));
        setError({...error, expiryError: !validate(text, 'cardExpiry')});
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            Payment Info
          </Text>
          <ThreeBitsComponent step={2} />
          <MySegmentedButtons nonEditable />
          <View style={screenStyles.lineStyle}></View>
          <Text style={[commonStyles.bigBoldText, screenStyles.hotelName]}>
            {order?.hotel.name}
          </Text>
          <Text>
            <Entypo name="location-pin" size={20} />
            {order?.hotel.location}
          </Text>
          <View style={screenStyles.orderCard}>
            <Text style={[commonStyles.boldText]}>
              Order Total: $ {totalPrice}
            </Text>
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
          <View style={screenStyles.expCvvContainer}>
            <MyTextInput
              value={expiry}
              errorText={error.expiryError && expiry ? '*Invalid' : undefined}
              onChangeText={text => HandleOnChangeText(text, 'expiry')}
              label="EXPIRY"
              keyboardType="numeric"
              style={screenStyles.smallTextInput}
            />
            <MyTextInput
              value={cvv}
              errorText={error.cvvError && cvv ? '*Invalid' : undefined}
              onChangeText={text => HandleOnChangeText(text, 'cvv')}
              keyboardType="numeric"
              label="CVV"
              style={screenStyles.smallTextInput}
            />
          </View>
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
