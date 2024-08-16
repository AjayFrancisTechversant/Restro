import {Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type OrderDetailsComponentPropsType = {
  editable?: boolean;
};

const OrderDetailsComponent: React.FC<OrderDetailsComponentPropsType> = ({
  editable,
}) => {
  const currentUserId = auth().currentUser?.uid;
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
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <FlatList
      ListHeaderComponent={null}
      data={['']}
      renderItem={() => <Text>orderdetails component</Text>}
      ListFooterComponent={null}
    />
  );
};

export default OrderDetailsComponent;
