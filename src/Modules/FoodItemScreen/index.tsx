import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {HotelType} from '../../Components/HotelsContainer';
import {FoodType} from '../../Components/FeaturedItemsComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyTextInput from '../../Components/MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import MyButton from '../../Components/MyButton';
import {FoodInTheOrderType} from '../OrderScreen';
import styles from './style';

const FoodItemScreen = ({route}: any) => {
  const currentUserId = auth().currentUser?.uid;
  const hotel: HotelType = route.params.hotel;
  const food: FoodType = route.params.food;
  const navigation: any = useNavigation();
  const [comment, setComment] = useState(StaticVariables.EMPTY_STRING);
  const [quantity, setQuantity] = useState(0);
  const [existingFoods, setExistingFoods] = useState(
    StaticVariables.EMPTY_ARRAY,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleAddToOrder = () => {
    addOrder();
    navigation.pop();
  };

  useEffect(() => {
    getExistingFoods();
  }, []);

  const addOrder = () => {
    const orderStructure = {
      hotelDetails: {
        hotelId: hotel.id,
        hotelImage: hotel.image,
        location: hotel.location,
        name: hotel.name,
        rating: hotel.rating,
      },
      foods: [
        ...existingFoods,
        {
          category: food.category,
          comment,
          desc: food.desc,
          foodImage: food.image,
          name: food.name,
          pricePerQuantity: food.price,
          quantity,
        },
      ],
    };
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .set(orderStructure)
      .then(() => {
        console.log('Order added!');
      });
  };
  
  const getExistingFoods = async () => {
    try {
      const documentSnapshot = await firestore()
      .collection('orders')
      .doc(currentUserId)
      .get();
      const existingFoodsArray: FoodInTheOrderType[] =
      documentSnapshot.data()?.foods;
      setExistingFoods(existingFoodsArray);
      const samefood = existingFoodsArray.find(i => i.name == food.name);
      console.log(samefood);
      if (samefood) {
        setQuantity(samefood.quantity);
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleViewOrder = () => {
    navigation.navigate(StaticVariables.OrderScreen);
  };

  return (
    <KeyboardAvoidingView behavior="position" style={[commonStyles.flexOne]}>
      <ScrollView>
        <Image source={{uri: food.image}} style={screenStyles.imageStyle} />
        <View style={screenStyles.headerComponentStyle}>
          <HeaderComponent color={ColorPalette.white} />
        </View>
        <View style={screenStyles.container}>
          <Text style={commonStyles.boldText}>
            {hotel.name} - {hotel.location}
          </Text>
          <Text style={screenStyles.heading}>{food.name}</Text>
          <Text style={commonStyles.boldText}>{food.desc}</Text>
          <MyTextInput
            label="Add comment..."
            multiline
            numberOfLines={3}
            style={screenStyles.textInput}
            onChangeText={setComment}
            value={comment}
          />
          <View style={screenStyles.quantityContainer}>
            <Text style={commonStyles.bigBoldText}>Quantity</Text>
            <View style={screenStyles.counterContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(quantity - 1)}
                disabled={quantity > 0 ? false : true}>
                <Entypo name="minus" size={30} />
              </TouchableOpacity>
              <Text style={commonStyles.bigBoldText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Entypo name="plus" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <MyButton
            onPress={handleAddToOrder}
            disabled={quantity != 0 ? false : true}
            style={[
              screenStyles.addToOrderButton,
              {
                backgroundColor:
                  quantity != 0 ? ColorPalette.red : ColorPalette.lightRed,
              },
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              Add to order {quantity != 0 && `($ ${quantity * food.price})`}
            </Text>
          </MyButton>
        </View>
      </ScrollView>
      <MyButton onPress={handleViewOrder} style={screenStyles.ViewOrderButton}>
        <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
          View my Orders $ 0.00
        </Text>
      </MyButton>
    </KeyboardAvoidingView>
  );
};

export default FoodItemScreen;
