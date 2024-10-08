import {View, Text, FlatList, Alert, BackHandler} from 'react-native';
import React, {FC, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import MyButton from '../../Components/MyButton';
import {useAppSelector} from '../../hooks/hooks';
import OrderDetailsComponent from '../OrderDetailsComponent';
import {HotelType} from '../../Components/HotelsContainer';
import {ProteinType} from '../../Components/FeaturedItemsComponent';
import { PreferenceType } from '../../Redux/Slices/UserDetailsSlice';
import styles from './style';

export type FoodInTheOrderType = {
  category: string;
  desc: string;
  name: string;
  foodImage: string;
  pricePerQuantity: number;
  comment: string;
  quantity: number;
  protein?: ProteinType;
};

export type OrderType = {
  foods: FoodInTheOrderType[];
  hotel: HotelType;
  userPreference: PreferenceType
};

const OrderScreen: FC = () => {
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const navigation: any = useNavigation();
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

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
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            My Order
          </Text>
          <MySegmentedButtons restrictedEditing />
          <View style={screenStyles.lineStyle}></View>
        </View>
      }
      data={['']}
      renderItem={() => (
        <OrderDetailsComponent setIsCheckoutDisabled={setIsCheckoutDisabled} />
      )}
      ListFooterComponentStyle={screenStyles.footerStyle}
      ListFooterComponent={
        !isCheckoutDisabled ? (
          <MyButton
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
        ) : null
      }
    />
  );
};

export default OrderScreen;
