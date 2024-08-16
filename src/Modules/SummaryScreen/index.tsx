import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import HeaderComponent from '../../Components/HeaderComponent';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import MyButton from '../../Components/MyButton';
import PreferenceRadioCard from '../../Components/Onboarding/PreferenceRadioCard';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import VehicleDetailsComponent from '../../Components/VehicleDetailsComponent';
import AddressDetailsComponent from '../../Components/AddressDetailsComponent';
import ATMCardComponent from '../../Components/ATMCardComponent';
import styles from './style';
import {clearAddressDetails} from '../../Redux/Slices/AddressDetailsSlice';
import {clearCardDetails} from '../../Redux/Slices/CardDetailsSlice';
import {clearVehicleDetails} from '../../Redux/Slices/vehicleDetailsSlice';

type TipType = '0%' | '10%' | '15%';

const SummaryScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const [tip, setTip] = useState<TipType>('0%');
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  //get total order price global fn
  const handleSubmit = () => {
    dispatch(clearAddressDetails());
    dispatch(clearCardDetails());
    dispatch(clearVehicleDetails());
    if (preferenceFromRedux == 'dine-in') {
      navigation.reset({
        index: 0,
        routes: [
          {name: StaticVariables.HomeScreen},
          {name: StaticVariables.SuccessScreenDineIn},
        ],
      });
    } else if (preferenceFromRedux == 'carry-out') {
      navigation.reset({
        index: 0,
        routes: [
          {name: StaticVariables.HomeScreen},
          {name: StaticVariables.SuccessScreenCarryOut},
        ],
      });
    } else if (preferenceFromRedux == 'delivery') {
      navigation.reset({
        index: 0,
        routes: [
          {name: StaticVariables.HomeScreen},
          {name: StaticVariables.SuccessScreenDelivery},
        ],
      });
    }
    //navigation reaplace to success screen by condition according to prefernece
  };
  return (
    <ScrollView>
      <View style={screenStyles.container}>
        <HeaderComponent color={ColorPalette.gray} />
        <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
          Order Summary
        </Text>
        <ThreeBitsComponent step={3} />
        <MySegmentedButtons nonEditable />
        <View style={screenStyles.lineStyle}></View>
        <Text>orderDetails Component</Text>
        <Text style={commonStyles.boldText}>Add Tip </Text>
        <Pressable onPress={() => setTip('0%')}>
          <PreferenceRadioCard
            isSelected={tip == '0%' ? true : false}
            text={`$ 0`}
          />
        </Pressable>
        <Pressable onPress={() => setTip('10%')}>
          <PreferenceRadioCard
            isSelected={tip == '10%' ? true : false}
            text={`10% ( $ ${0} )`}
          />
        </Pressable>
        <Pressable onPress={() => setTip('15%')}>
          <PreferenceRadioCard
            isSelected={tip == '15%' ? true : false}
            text={`15% ( $ ${0} )`}
          />
        </Pressable>
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
      </View>
    </ScrollView>
  );
};

export default SummaryScreen;
