import {View, Text, Pressable, FlatList} from 'react-native';
import React, {FC, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import HeaderComponent from '../../Components/HeaderComponent';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import MyButton from '../../Components/MyButton';
import PreferenceRadioCard from '../../Components/Onboarding/PreferenceRadioCard';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import VehicleDetailsComponent from '../../Components/VehicleDetailsComponent';
import AddressDetailsComponent from '../../Components/AddressDetailsComponent';
import ATMCardComponent from '../../Components/ATMCardComponent';
import {clearAddressDetails} from '../../Redux/Slices/AddressDetailsSlice';
import {clearCardDetails} from '../../Redux/Slices/CardDetailsSlice';
import {clearVehicleDetails} from '../../Redux/Slices/vehicleDetailsSlice';
import OrderDetailsComponent from '../OrderDetailsComponent';
import styles from './style';

type TipType = '0%' | '10%' | '15%';

const SummaryScreen: FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const [tip, setTip] = useState<TipType>('0%');
  const [totalAmount, setTotalAmount] = useState(0);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmit = () => {
    dispatch(clearAddressDetails());
    dispatch(clearCardDetails());
    dispatch(clearVehicleDetails());
    if (preferenceFromRedux == 'dine-in') {
      navigation.navigate(StaticVariables.SuccessScreenDineIn);
    } else if (preferenceFromRedux == 'carry-out') {
      navigation.navigate(StaticVariables.SuccessScreenCarryOut);
    } else if (preferenceFromRedux == 'delivery') {
      navigation.navigate(StaticVariables.SuccessScreenDelivery);
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={screenStyles.container}
      ListHeaderComponent={
        <>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            Order Summary
          </Text>
          <ThreeBitsComponent step={3} />
          <View style={screenStyles.lineStyle}></View>
        </>
      }
      data={['']}
      renderItem={() => (
        <OrderDetailsComponent
          setTotalAmount={setTotalAmount}
          inSummaryScreen
        />
      )}
      ListFooterComponent={
        <>
          <Text style={commonStyles.boldText}>Add Tip </Text>
          <View style={screenStyles.tipContainer}>
            <Pressable onPress={() => setTip('0%')}>
              <PreferenceRadioCard
                isSelected={tip == '0%' ? true : false}
                text={`$ 0`}
              />
            </Pressable>
            <Pressable onPress={() => setTip('10%')}>
              <PreferenceRadioCard
                isSelected={tip == '10%' ? true : false}
                text={`10% ( $ ${(totalAmount * 0.1).toPrecision(2)} )`}
              />
            </Pressable>
            <Pressable onPress={() => setTip('15%')}>
              <PreferenceRadioCard
                isSelected={tip == '15%' ? true : false}
                text={`15% ( $ ${(totalAmount * 0.15).toPrecision(2)} )`}
              />
            </Pressable>
          </View>
          {preferenceFromRedux == 'carry-out' ? (
            <VehicleDetailsComponent />
          ) : preferenceFromRedux == 'delivery' ? (
            <AddressDetailsComponent />
          ) : null}
          <Text style={commonStyles.boldText}>Payment Info</Text>
          <ATMCardComponent />
          <MyButton
            onPress={handleSubmit}
            style={[
              screenStyles.bottomButton,
              {
                backgroundColor: ColorPalette.red,
              },
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              Looks Good!...Pay Now
            </Text>
          </MyButton>
        </>
      }
      ListFooterComponentStyle={screenStyles.footerStyle}
    />
  );
};

export default SummaryScreen;
