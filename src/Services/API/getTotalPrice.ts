import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FoodType} from '../../Components/FeaturedItemsComponent';
import {FoodInTheOrderType} from '../../Modules/OrderScreen';

export const getTotalPrice = async (currentUserId: string) => {
  try {
    const documentSnapshot = await firestore()
      .collection('orders')
      .doc(currentUserId)
      .get();
    const foods: FoodInTheOrderType[] = documentSnapshot.data()?.foods;
    let totalPrice = 0;
    foods.map(i => {
      totalPrice += i.quantity * i.pricePerQuantity;
    });
    return totalPrice;
  } catch (error) {
    Alert.alert('Error', (error as Error).message);
  }
};
