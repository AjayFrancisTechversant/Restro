import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';
import {OrderType} from '../OrderScreen';
import styles from './style';

const SuccessScreenDineIn = () => {
  const [order, setOrder] = useState<OrderType>();
  const [orderId, setOrderId] = useState<string>();
  const currentUserId = auth().currentUser?.uid;
  const navigation: any = useNavigation();
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
      setOrderId(docSnapshot.id);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  const handleFinish = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .delete()
      .then(() => {
        navigation.popToTop();
      })
      .catch(error => Alert.alert((error as Error).message));
  };
  return (
    <View style={screenStyles.container}>
      <View>
        <HeaderComponent color={ColorPalette.white} />
        <Ionicons
          name="checkmark-circle-outline"
          size={100}
          color={ColorPalette.white}
          style={screenStyles.checkIconStyle}
        />
        <Text style={screenStyles.heading}>Success!</Text>
        <Text style={screenStyles.text}>
          Your order has been received and is being prepared.
        </Text>
        <Text style={screenStyles.hotelNameText}>{order?.hotel.name}</Text>
        <Text style={screenStyles.text}>
          <Entypo name="location-pin" size={20} color={ColorPalette.white} />
          {order?.hotel.location}
        </Text>
        <Text style={screenStyles.orderNumberText}>Order #{orderId}</Text>
      </View>
      <View>
        <Text style={screenStyles.text}>
          For more Information about your order, Contact us!
        </Text>
        <MyButton
          onPress={() => navigation.navigate(StaticVariables.ContactUsScreen)}
          style={screenStyles.bottomButton}>
          <Text style={[commonStyles.boldText, commonStyles.redText]}>
            Contact Us
          </Text>
        </MyButton>
        <MyButton onPress={handleFinish} style={screenStyles.bottomButton}>
          <Text style={[commonStyles.boldText, commonStyles.redText]}>
            Go To Home
          </Text>
        </MyButton>
      </View>
    </View>
  );
};

export default SuccessScreenDineIn;
