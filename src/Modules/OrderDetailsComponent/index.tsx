import {Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {OrderType} from '../OrderScreen';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import OrderItemCard from '../../Components/OrderItemCard';

type OrderDetailsComponentPropsType = {
  editable?: boolean;
};

const OrderDetailsComponent: React.FC<OrderDetailsComponentPropsType> = ({
  editable,
}) => {
  const currentUserId = auth().currentUser?.uid;
  const [order, setOrder] = useState<OrderType>();
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .get()
      .then((docSnapshot: any) => {
        setOrder(docSnapshot.data());
      });
  };
  console.log(order);

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
      style={screenStyles.container}
      ListHeaderComponent={
        <>
          <Text style={commonStyles.bigBoldText}>
            {order?.hotelDetails.name}
          </Text>
          <Text style={[commonStyles.boldText, commonStyles.grayText]}>
            <Entypo name="location-pin" color={ColorPalette.gray} size={20} />
            {order?.hotelDetails.location}
          </Text>
          <Text style={[commonStyles.boldText, commonStyles.greenText]}>
            We are Open
          </Text>
          <Text style={[commonStyles.boldText, commonStyles.grayText]}>
            <Feather name="clock" />
            10:00am - 9:00pm
          </Text>
        </>
      }
      data={order?.foods}
      renderItem={({item}) => <OrderItemCard food={item} />}
      ListFooterComponent={null}
    />
  );
};

export default OrderDetailsComponent;
