import firestore, {arrayRemove} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {FoodInTheOrderType} from '../../Modules/OrderScreen';
import {MessageOptions, showMessage} from 'react-native-flash-message';

export const removeFoodFromCart = async (
  name: string,
  currentUserId: string,
) => {
  const removeMessage: MessageOptions = {
    message: 'Item Removed',
    type: 'danger',
    floating: true,
    titleStyle: {fontWeight: 'bold'},
  };

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
      showMessage(removeMessage);
    }
  } catch (error) {
    Alert.alert((error as Error).message);
  }
};
