import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyButton from '../MyButton';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import StaticVariables from '../../Preferences/StaticVariables';
import {FoodInTheOrderType, } from '../../Modules/OrderScreen';
import styles from './style';

const ViewMyOrderButton = () => {
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const currentUserId = auth().currentUser?.uid;
  const [cartPrice, setCartPrice] = useState<number>();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .doc(currentUserId)
      .onSnapshot((documentSnapshot: any) => {
        const foods: FoodInTheOrderType[] = documentSnapshot.data()?.foods;
        let totalPrice = 0;
        foods?.map(i => {
          totalPrice += i.quantity * i.pricePerQuantity;
        });
        setCartPrice(totalPrice);
      });
    return () => subscriber();
  }, []);
  console.log(cartPrice);

  return (
    <MyButton
      onPress={() => navigation.navigate(StaticVariables.OrderScreen)}
      style={screenStyles.buttonStyle}>
      <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
        View My Orders $ {cartPrice}
      </Text>
    </MyButton>
  );
};

export default React.memo(ViewMyOrderButton);
