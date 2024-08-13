import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const OrderScreen = () => {
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
      .doc('z2RCba0ZMoLjd3eKM1Ls')
      .get()
      .then(docSnapshot => {
        console.log(docSnapshot.data());
      });
  };

  return (
    <View>
      <Text>OrderScreen</Text>
    </View>
  );
};

export default OrderScreen;
