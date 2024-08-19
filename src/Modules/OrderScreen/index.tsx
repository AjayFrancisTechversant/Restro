import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import MyButton from '../../Components/MyButton';
import {useAppSelector} from '../../hooks/hooks';
import OrderDetailsComponent from '../OrderDetailsComponent';
import styles from './style';

export type FoodInTheOrderType = {
  category: string;
  desc: string;
  name: string;
  foodImage: string;
  pricePerQuantity: number;
  comment: string;
  quantity: number;
};

export type OrderType = {
  foods: FoodInTheOrderType[];
  hotelDetails: {
    hotelId: string;
    hotelImage: string;
    location: string;
    name: string;
    rating: String;
  };
};

const OrderScreen = () => {
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  const handleSubmit = () => {
    if (preferenceFromRedux == 'carry-out') {
      navigation.navigate(StaticVariables.VehicleScreen);
    } else if (preferenceFromRedux == 'delivery') {
      navigation.navigate(StaticVariables.AddressScreen);
    } else if (preferenceFromRedux == 'dine-in') {
      navigation.navigate(StaticVariables.PaymentInfoScreen);
    }
  };
  return (
    <FlatList
      ListHeaderComponent={
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            My Order
          </Text>
          <MySegmentedButtons nonEditable />
          <View style={screenStyles.lineStyle}></View>
        </View>
      }
      data={['']}
      renderItem={() => <OrderDetailsComponent />}
      ListFooterComponentStyle={screenStyles.footerStyle}
      ListFooterComponent={
        <MyButton
          // disable if no foodds iin order from firebase
          //also colorChange
          onPress={handleSubmit}
          style={[
            screenStyles.bottomButton,
            {
              backgroundColor: ColorPalette.red,
            },
          ]}>
          <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
            Checkout
          </Text>
        </MyButton>
      }
    />
  );
};

export default OrderScreen;
