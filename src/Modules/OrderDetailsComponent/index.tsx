import {Text, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {OrderType} from '../OrderScreen';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import OrderItemCard from '../../Components/OrderItemCard';
import MyTextInput from '../../Components/MyTextInput';
import {useNavigation} from '@react-navigation/native';
import StaticVariables from '../../Preferences/StaticVariables';
import {getTotalPrice} from '../../Services/API/getTotalPrice';
import {SetStateType} from '../../Types/Types';
import styles from './style';

type OrderDetailsComponentPropsType = {
  inSummaryScreen?: boolean;
  setIsCheckoutDisabled?: SetStateType<boolean>;
};
type Prices = {
  subTotal: number;
  tax: number;
  delivery: number;
  total: number;
};
const OrderDetailsComponent: React.FC<OrderDetailsComponentPropsType> = ({
  inSummaryScreen,
  setIsCheckoutDisabled,
}) => {
  const navigation: any = useNavigation();
  const currentUserId = auth().currentUser?.uid;
  const [order, setOrder] = useState<OrderType>();
  const [prices, setPrices] = useState<Prices>({
    subTotal: 0,
    delivery: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    fetchOrders();
    calculatePrices();
  }, []);

  const calculatePrices = async () => {
    if (currentUserId) {
      const subTotal = await getTotalPrice(currentUserId);
      if (subTotal) {
        const tax = subTotal * 0.1;
        const delivery = 2;
        const total = tax + delivery + subTotal;
        setPrices({delivery, total, subTotal, tax});
      }
    }
  };
  const fetchOrders = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .get()
      .then((docSnapshot: any) => {
        setOrder(docSnapshot.data());
        if (setIsCheckoutDisabled) {
          if (docSnapshot.data().foods) {
            setIsCheckoutDisabled(true);
          } else setIsCheckoutDisabled(false);
        }
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
    <>
      {order?.foods ? (
        <FlatList
          style={screenStyles.container}
          ListHeaderComponent={
            <>
              <Text style={commonStyles.bigBoldText}>{order?.hotel.name}</Text>
              <Text style={[commonStyles.boldText, commonStyles.grayText]}>
                <Entypo
                  name="location-pin"
                  color={ColorPalette.gray}
                  size={20}
                />
                {order?.hotel.location}
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
          renderItem={({item}) => (
            <OrderItemCard inSummaryScreen={inSummaryScreen} food={item} />
          )}
          ListFooterComponentStyle={screenStyles.footerStyle}
          ListFooterComponent={
            <>
              {!inSummaryScreen && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(StaticVariables.MenuScreen, {
                        hotel: order?.hotel,
                      })
                    }
                    style={screenStyles.addMoreItemsButton}>
                    <Text style={[commonStyles.redText, commonStyles.boldText]}>
                      + Add more items
                    </Text>
                  </TouchableOpacity>
                  <MyTextInput
                    style={screenStyles.couponCodeStyle}
                    label="Enter Coupon Code"
                    right={
                      <TextInput.Icon
                        icon="check"
                        forceTextInputFocus={false}
                      />
                    }
                  />
                </>
              )}
              <View style={screenStyles.amountContainer}>
                <Text style={commonStyles.boldText}>Subtotal</Text>
                <Text style={commonStyles.boldText}>$ {prices.subTotal}</Text>
              </View>
              <View style={screenStyles.amountContainer}>
                <Text style={commonStyles.boldText}>Taxes</Text>
                <Text style={commonStyles.boldText}>$ {prices.tax}</Text>
              </View>
              <View style={screenStyles.amountContainer}>
                <Text style={commonStyles.boldText}>Delivery</Text>
                <Text style={commonStyles.boldText}>$ {prices.delivery}</Text>
              </View>
              <View style={screenStyles.lineBreak}></View>
              <View style={screenStyles.amountContainer}>
                <Text style={commonStyles.boldText}>TOTAL</Text>
                <Text style={commonStyles.boldText}>$ {prices.total}</Text>
              </View>
            </>
          }
        />
      ) : (
        <Text style={screenStyles.NoItemsText}>No items in your cart!</Text>
      )}
    </>
  );
};

export default OrderDetailsComponent;
