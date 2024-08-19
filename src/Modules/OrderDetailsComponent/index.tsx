import {Text, FlatList, TouchableOpacity, View} from 'react-native';
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
import MyTextInput from '../../Components/MyTextInput';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import StaticVariables from '../../Preferences/StaticVariables';

type OrderDetailsComponentPropsType = {
  editable?: boolean;
};

const OrderDetailsComponent: React.FC<OrderDetailsComponentPropsType> = ({
  editable,
}) => {
  const navigation: any = useNavigation();
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
      ListFooterComponent={
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack(StaticVariables.MenuScreen)}
            style={screenStyles.addMoreItemsButton}>
            <Text style={[commonStyles.redText, commonStyles.boldText]}>
              + Add more items
            </Text>
          </TouchableOpacity>
          <MyTextInput
            style={screenStyles.couponCodeStyle}
            label="Enter Coupon Code"
            right={<TextInput.Icon icon="check" forceTextInputFocus={false} />}
          />
          <View style={screenStyles.amountContainer}>
            <Text style={commonStyles.boldText}>Subtotal</Text>
            <Text style={commonStyles.boldText}>$0.00</Text>
          </View>
          <View style={screenStyles.amountContainer}>
            <Text style={commonStyles.boldText}>Taxes</Text>
            <Text style={commonStyles.boldText}>$2.00</Text>
          </View>
          <View style={screenStyles.amountContainer}>
            <Text style={commonStyles.boldText}>Delivery</Text>
            <Text style={commonStyles.boldText}>$0.00</Text>
          </View>
          <View style={screenStyles.lineBreak}></View>
          <View style={screenStyles.amountContainer}>
            <Text style={commonStyles.boldText}>TOTAL</Text>
            <Text style={commonStyles.boldText}>$0.00</Text>
          </View>
        </>
      }
    />
  );
};

export default OrderDetailsComponent;
