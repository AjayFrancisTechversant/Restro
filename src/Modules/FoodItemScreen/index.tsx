import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {ProteinType} from '../../Components/FeaturedItemsComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyTextInput from '../../Components/MyTextInput';
import StaticVariables from '../../Preferences/StaticVariables';
import MyButton from '../../Components/MyButton';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {FoodInTheOrderType, OrderType} from '../OrderScreen';
import {removeFoodFromCart} from '../../Services/API/removeFoodFromCart';
import {MessageOptions, showMessage} from 'react-native-flash-message';
import ViewMyOrderButton from '../../Components/ViewMyOrderButton';
import PreferenceRadioCard from '../../Components/Onboarding/PreferenceRadioCard';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';
import styles from './style';

type FoodItemScreenPropsType = NativeStackScreenProps<
  HomeStackParamsList,
  'FoodItemScreen'
>;

const FoodItemScreen: FC<FoodItemScreenPropsType> = ({route}) => {
  const currentUserId = auth().currentUser?.uid;
  const {food, hotel} = route.params;
  const [selectedProtein, setSelectedProtein] = useState<ProteinType>();
  const navigation: any = useNavigation();
  const [comment, setComment] = useState(StaticVariables.EMPTY_STRING);
  const [quantity, setQuantity] = useState(0);
  const [isAddingloading, setIsAddingloading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [existingFoods, setExistingFoods] = useState(
    StaticVariables.EMPTY_ARRAY,
  );
  const [currentHotelIdinOrder, setCurrentHotelIdinOrder] = useState<
    string | undefined
  >();

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
  };

  useEffect(() => {
    getExistingFoods();
  }, []);

  const addMessage: MessageOptions = {
    message: 'Item Added',
    type: 'success',
    floating: true,
    titleStyle: {fontWeight: 'bold'},
  };

  const addOrder = async () => {
    setIsAddingloading(true);
    try {
      if (
        currentHotelIdinOrder == hotel.id ||
        currentHotelIdinOrder == undefined
      ) {
        //same hotel or no hotel
        if (quantity > 0) {
          let updatedFoods: FoodInTheOrderType[] = [...existingFoods];
          const existingFoodIndex = updatedFoods.findIndex(
            item => item.name === food.name,
          );
          if (existingFoodIndex > -1) {
            updatedFoods[existingFoodIndex].quantity = quantity;
            updatedFoods[existingFoodIndex].comment = comment;
            if (updatedFoods[existingFoodIndex].protein) {
              updatedFoods[existingFoodIndex].protein = selectedProtein;
            }
          } else {
            if (food.proteins && selectedProtein) {
              updatedFoods.push({
                category: food.category,
                comment,
                desc: food.desc,
                foodImage: food.image,
                name: food.name,
                pricePerQuantity: selectedProtein?.price,
                quantity,
                protein: selectedProtein,
              });
            } else if (food.price) {
              updatedFoods.push({
                category: food.category,
                comment,
                desc: food.desc,
                foodImage: food.image,
                name: food.name,
                pricePerQuantity: food.price,
                quantity,
              });
            }
          }
          const orderStructure: OrderType = {
            hotel: {
              id: hotel.id,
              image: hotel.image,
              location: hotel.location,
              name: hotel.name,
              preferences: hotel.preferences,
            },
            foods: updatedFoods,
          };
          await firestore()
            .collection('orders')
            .doc(currentUserId)
            .set(orderStructure);
          showMessage(addMessage);
        } else {
          if (currentUserId && currentHotelIdinOrder) {
            await removeFoodFromCart(food.name, currentUserId);
          }
        }
        navigation.pop();
      } else {
        //different hotel
        if (quantity > 0) {
          Alert.alert(
            'Different Hotel!!!',
            'Your cart contains items from different hotel. Do you want clear the current cart and add this item?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Proceed',
                onPress: async () => {
                  let updatedFoods: FoodInTheOrderType[];
                  if (food.proteins && selectedProtein) {
                    updatedFoods = [
                      {
                        category: food.category,
                        comment,
                        desc: food.desc,
                        foodImage: food.image,
                        name: food.name,
                        pricePerQuantity: selectedProtein?.price,
                        quantity,
                        protein: selectedProtein,
                      },
                    ];
                    const orderStructure: OrderType = {
                      hotel: {
                        id: hotel.id,
                        image: hotel.image,
                        location: hotel.location,
                        name: hotel.name,
                        preferences: hotel.preferences,
                      },
                      foods: updatedFoods,
                    };
                    await firestore()
                      .collection('orders')
                      .doc(currentUserId)
                      .set(orderStructure);
                    showMessage(addMessage);
                  } else if (food.price) {
                    updatedFoods = [
                      {
                        category: food.category,
                        comment,
                        desc: food.desc,
                        foodImage: food.image,
                        name: food.name,
                        pricePerQuantity: food.price,
                        quantity,
                      },
                    ];
                    const orderStructure: OrderType = {
                      hotel: {
                        id: hotel.id,
                        image: hotel.image,
                        location: hotel.location,
                        name: hotel.name,
                        preferences: hotel.preferences,
                      },
                      foods: updatedFoods,
                    };
                    await firestore()
                      .collection('orders')
                      .doc(currentUserId)
                      .set(orderStructure);
                    showMessage(addMessage);
                  }
                  navigation.pop();
                },
              },
            ],
          );
        } else {
          navigation.pop();
        }
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsAddingloading(false);
    }
  };

  const getExistingFoods = async () => {
    setQuantityLoading(true);
    try {
      const documentSnapshot = await firestore()
        .collection('orders')
        .doc(currentUserId)
        .get();
      const order = documentSnapshot.data();
      const existingFoodsArray: FoodInTheOrderType[] = order?.foods;
      if (order) {
        setExistingFoods(existingFoodsArray);
        setCurrentHotelIdinOrder(order.hotel.id);
      }
      const samefood = existingFoodsArray?.find(i => i.name == food.name);
      if (samefood) {
        setQuantity(samefood.quantity);
        setComment(samefood.comment)
        if (samefood.protein) {
          setSelectedProtein(samefood.protein);
        }
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    setQuantityLoading(false);
  };

  const calculateAddOrderAmount = () => {
    if (food.price) {
      return quantity * food.price;
    } else if (selectedProtein) {
      return quantity * selectedProtein?.price;
    } else return null;
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{uri: food.image}} style={screenStyles.imageStyle} />
        <View style={screenStyles.headerComponentStyle}>
          <HeaderComponent color={ColorPalette.white} />
        </View>
        <View style={screenStyles.container}>
          <Text style={commonStyles.boldText}>
            {hotel.name} - {hotel.location}
          </Text>
          <Text style={screenStyles.heading}>{food.name}</Text>
          {food.price && (
            <Text style={[commonStyles.boldText, commonStyles.redText]}>
              $ {food.price}
            </Text>
          )}
          <Text style={commonStyles.boldText}>{food.desc}</Text>
          {food.proteins && (
            <View style={screenStyles.proteinContainer}>
              <View style={screenStyles.proteinContainerHeader}>
                <Text style={commonStyles.boldText}>PROTEIN</Text>
                <Text style={commonStyles.redText}>*Required</Text>
              </View>
              {food.proteins?.map((i: ProteinType, index) => (
                <Pressable
                  key={index}
                  style={screenStyles.proteinRadioButton}
                  onPress={() => setSelectedProtein(i)}>
                  <PreferenceRadioCard
                    isSelected={selectedProtein?.type == i.type ? true : false}
                    text={`${i.type}  $ ${i.price}`}
                  />
                </Pressable>
              ))}
            </View>
          )}
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
              <Text style={commonStyles.bigBoldText}>
                {!quantityLoading ? (
                  quantity
                ) : (
                  <ActivityIndicator size={20} color={ColorPalette.gray} />
                )}
              </Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Entypo name="plus" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <MyButton
            onPress={handleAddToOrder}
            disabled={
              (food.proteins && !selectedProtein) ||
              isAddingloading ||
              quantityLoading
            }
            style={[
              screenStyles.addToOrderButton,
              {
                backgroundColor:
                  food.proteins && !selectedProtein||quantityLoading
                    ? ColorPalette.lightRed
                    : ColorPalette.red,
              },
            ]}>
            {!isAddingloading ? (
              <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                Add to order{' '}
                {quantity != 0 && `($ ${calculateAddOrderAmount()})`}
              </Text>
            ) : (
              <ActivityIndicator size={20} color={ColorPalette.white} />
            )}
          </MyButton>
        </View>
        <ViewMyOrderButton disabled={isAddingloading ? true : false} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FoodItemScreen;
