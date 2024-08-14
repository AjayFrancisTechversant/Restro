import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import MyButton from '../../Components/MyButton';
import {useAppSelector} from '../../hooks/hooks';

const OrderScreen = () => {
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const navigation: any = useNavigation();
  const currentUserId = auth().currentUser?.uid;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .get()
      .then(docSnapshot => {
        console.log(docSnapshot.data());
      });
  };
  const handleSubmit = () => {
    if (preferenceFromRedux == 'carry-out') {
      navigation.navigate(StaticVariables.VehicleScreen);
    } else if (preferenceFromRedux == 'delivery') {
      navigation.navigate(StaticVariables.AddressScreen);
    }
    //what if dine-in
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
      renderItem={() => <Text>orderDetails container</Text>}
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
