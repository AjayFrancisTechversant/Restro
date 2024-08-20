import {View, Text, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyButton from '../../Components/MyButton';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import {OrderType} from '../OrderScreen';
import styles from './style';

type ProgressType = 'inProgress' | 'handedOver';

const SuccessScreenDelivery:FC = () => {
  const [order, setOrder] = useState<OrderType>();
  const [orderId, setOrderId] = useState<string>();
  const [progress, setProgress] = useState<ProgressType>('inProgress');
  const currentUserId = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    fecthOrder();
  }, []);

  const fecthOrder = async () => {
    try {
      const docSnapshot: any = await firestore()
        .collection('orders')
        .doc(currentUserId)
        .get();
      setOrder(docSnapshot.data());
      setOrderId(docSnapshot.id);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  const handleFinish = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .delete()
      .then(() => {
        navigation.popToTop();
      })
      .catch(error => Alert.alert((error as Error).message));
  };
  return (
    <View
      style={[
        screenStyles.container,
        {
          backgroundColor:
            progress == 'inProgress' ? ColorPalette.white : ColorPalette.red,
        },
      ]}>
      <View>
        <HeaderComponent
          color={
            progress == 'inProgress' ? ColorPalette.red : ColorPalette.white
          }
        />
        {progress == 'inProgress' ? (
          <MaterialCommunityIcons
            name="bike-fast"
            size={100}
            color={ColorPalette.red}
            style={screenStyles.checkIconStyle}
          />
        ) : (
          <Ionicons
            name="checkmark-circle-outline"
            size={100}
            color={ColorPalette.white}
            style={screenStyles.checkIconStyle}
          />
        )}
        {progress == 'inProgress' ? (
          <Text style={[screenStyles.heading, {color: ColorPalette.red}]}>
            On our way!
          </Text>
        ) : (
          <Text style={[screenStyles.heading, {color: ColorPalette.white}]}>
            Success!
          </Text>
        )}
        {progress == 'inProgress' ? (
          <Text style={[screenStyles.text, {color: ColorPalette.red}]}>
            Your order has been received and is being delivered to you
          </Text>
        ) : (
          <Text style={[screenStyles.text, {color: ColorPalette.white}]}>
            You have recieved your order!
          </Text>
        )}
        <Text
          style={[
            screenStyles.hotelNameText,
            {
              color:
                progress == 'inProgress'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          {order?.hotel.name}
        </Text>
        <Text
          style={[
            screenStyles.text,
            {
              color:
                progress == 'inProgress'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Entypo
            name="location-pin"
            size={20}
            color={
              progress == 'inProgress' ? ColorPalette.red : ColorPalette.white
            }
          />
          {order?.hotel.location}
        </Text>
        <Text
          style={[
            screenStyles.orderNumberText,
            {
              color:
                progress == 'inProgress'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          Order #{orderId}
        </Text>
      </View>
      <View>
        {progress == 'inProgress' ? (
          <>
            <Text style={[screenStyles.text, {color: ColorPalette.red}]}>
              For more Information about your order, Contact us!
            </Text>
            <MyButton
              onPress={() =>
                navigation.navigate(StaticVariables.ContactUsScreen)
              }
              style={screenStyles.contactUsButton}>
              <Text style={[commonStyles.boldText, {color: ColorPalette.red}]}>
                Contact Us
              </Text>
            </MyButton>
            <MyButton
              onPress={() =>
                navigation.navigate(StaticVariables.TrackingScreen)
              }
              style={[
                screenStyles.bottomButton,
                {backgroundColor: ColorPalette.red},
              ]}>
              <Text
                style={[commonStyles.boldText, {color: ColorPalette.white}]}>
                <MaterialCommunityIcons
                  name="map-marker-question-outline"
                  size={15}
                  color={ColorPalette.white}
                />{' '}
                Track your Order!
              </Text>
            </MyButton>
            <MyButton
              onPress={() => {
                setProgress('handedOver');
              }}
              style={[
                screenStyles.bottomButton,
                {backgroundColor: ColorPalette.red},
              ]}>
              <Text
                style={[commonStyles.boldText, {color: ColorPalette.white}]}>
                Collect Order
              </Text>
            </MyButton>
          </>
        ) : (
          <MyButton
            onPress={handleFinish}
            style={[
              screenStyles.bottomButton,
              {backgroundColor: ColorPalette.white},
            ]}>
            <Text style={[commonStyles.boldText, commonStyles.redText]}>
              Go To Home
            </Text>
          </MyButton>
        )}
      </View>
    </View>
  );
};

export default SuccessScreenDelivery;
