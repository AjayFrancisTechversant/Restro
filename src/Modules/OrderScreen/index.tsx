import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import StaticVariables from '../../Preferences/StaticVariables';

const OrderScreen = () => {
  const navigation: any = useNavigation();
  const currentUserId = auth().currentUser?.uid;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .get()
      .then(docSnapshot => {
        console.log(docSnapshot.data());
      });
  };

  return (
    <View>
      <Text>OrderScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(StaticVariables.PaymentInfoScreen)}>
        <Text>go to paymentScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;
