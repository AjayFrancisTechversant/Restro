import {Text, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import MyButton from '../../Components/MyButton';
import styles from './style';

type OrderDetailsComponentPropsType = {
  inSummaryScreen?: boolean;
  setIsCheckoutDisabled?: SetStateType<boolean>;
  setTotalAmount?: SetStateType<number>;
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
  setTotalAmount,
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
    const subscriber = firestore()
      .collection('orders')
      .doc(currentUserId)
      .onSnapshot((docSnapshot: any) => {
        if (docSnapshot.exists) {
          setOrder(docSnapshot.data());
          if (setIsCheckoutDisabled) {
            if (docSnapshot.data().foods?.length == 0) {
              setIsCheckoutDisabled(true);
            } else setIsCheckoutDisabled(false);
          }
          calculatePrices();
        }
      });
    return () => subscriber();
  }, []);

  const calculatePrices = useCallback(async () => {
    if (currentUserId) {
      const subTotal = await getTotalPrice(currentUserId);
      if (subTotal) {
        const tax = subTotal * 0.1;
        const delivery = 2;
        const total = tax + delivery + subTotal;
        setTotalAmount && setTotalAmount(total);
        setPrices({delivery, total, subTotal, tax});
      }
    }
  }, [order]);

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
      {order ? (
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
          ListEmptyComponent={
            <Text style={screenStyles.emptyCartText}>Empty Cart!</Text>
          }
          ListFooterComponentStyle={screenStyles.footerStyle}
          ListFooterComponent={
            <>
              {!inSummaryScreen && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.reset({
                        routes: [
                          {
                            name: StaticVariables.HomeStack,
                            state: {
                              routes: [
                                {
                                  name: StaticVariables.HomeScreen,
                                },
                                {
                                  name: StaticVariables.MenuScreen,
                                  params: {
                                    hotel: order?.hotel,
                                  },
                                },
                              ],
                            },
                          },
                        ],
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
              {order.foods.length != 0 && (
                <>
                  <View style={screenStyles.amountContainer}>
                    <Text style={commonStyles.boldText}>Subtotal</Text>
                    <Text style={commonStyles.boldText}>
                      $ {prices.subTotal}
                    </Text>
                  </View>
                  <View style={screenStyles.amountContainer}>
                    <Text style={commonStyles.boldText}>Taxes</Text>
                    <Text style={commonStyles.boldText}>
                      $ {prices.tax.toPrecision(2)}
                    </Text>
                  </View>
                  <View style={screenStyles.amountContainer}>
                    <Text style={commonStyles.boldText}>Delivery</Text>
                    <Text style={commonStyles.boldText}>
                      $ {prices.delivery}
                    </Text>
                  </View>
                  <View style={screenStyles.lineBreak}></View>
                  <View style={screenStyles.amountContainer}>
                    <Text style={commonStyles.boldText}>TOTAL</Text>
                    <Text style={commonStyles.boldText}>$ {prices.total}</Text>
                  </View>
                </>
              )}
            </>
          }
        />
      ) : (
        <>
          <Text style={screenStyles.emptyCartText}>Empty Cart!</Text>
          <MyButton
            onPress={() => navigation.popToTop()}
            style={screenStyles.bottomButton}>
            <Text style={[commonStyles.redText, commonStyles.boldText]}>
              Go to Home
            </Text>
          </MyButton>
        </>
      )}
    </>
  );
};

export default OrderDetailsComponent;
