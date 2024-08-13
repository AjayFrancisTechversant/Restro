import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
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
import styles from './style';

const FoodItemScreen = ({route}: any) => {
  const hotel: HotelType = route.params.hotel;
  const food: FoodType = route.params.food;
  const navigation: any = useNavigation();
  const [comment, setComment] = useState(StaticVariables.EMPTY_STRING);
  const [quantity, setQuantity] = useState(0);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleAddToOrder = () => {
    addOrder()
    navigation.pop();
  };
  const addOrder=()=>{
    const orderStructure=
  }
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
