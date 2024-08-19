import firestore, {arrayRemove} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {FoodInTheOrderType} from '../../Modules/OrderScreen';

export const removeFoodFromCart = async (
  name: string,
  currentUserId: string,
) => {
  try {
    const documentSnapshot = await firestore()
      .collection('orders')
      .doc(currentUserId)
      .get();
    const existingFoodsArray: FoodInTheOrderType[] =
      documentSnapshot.data()?.foods;
    const existingFoodIndex = existingFoodsArray.findIndex(
      item => item.name === name,
    );
    if (existingFoodIndex > -1) {
      await firestore()
        .collection('orders')
        .doc(currentUserId)
        .update({
          foods: arrayRemove(existingFoodsArray[existingFoodIndex]),
        });
    }
  } catch (error) {
    Alert.alert((error as Error).message);
  }
};
