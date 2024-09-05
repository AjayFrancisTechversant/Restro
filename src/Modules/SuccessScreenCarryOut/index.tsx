import {View, Text, ScrollView, Alert, ActivityIndicator, BackHandler} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MyButton from '../../Components/MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HeaderComponent from '../../Components/HeaderComponent';
import StaticVariables from '../../Preferences/StaticVariables';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {OrderType} from '../OrderScreen';
import styles from './style';

type ProgressType = 'justPlacedOrder' | 'customerOutside' | 'handedOver';

const SuccessScreenCarryOut: FC = () => {
  const [order, setOrder] = useState<OrderType>();
  const [orderId, setOrderId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressType>('justPlacedOrder');
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
    } finally {
      setLoading(false);
    }
  };
  const handleFinish = () => {
    firestore()
      .collection('orders')
      .doc(currentUserId)
      .delete()
      .then(() => {
        navigation.navigate(StaticVariables.HomeStack);
      })
      .catch(error => Alert.alert((error as Error).message));
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[
          screenStyles.container,
          {
            backgroundColor:
              progress == 'justPlacedOrder'
                ? ColorPalette.white
                : ColorPalette.red,
          },
        ]}>
        <View>
          <HeaderComponent
            color={
              progress == 'justPlacedOrder'
                ? ColorPalette.red
                : ColorPalette.white
            }
          />
          {progress == 'justPlacedOrder' ? (
            <Entypo
              name="hour-glass"
              size={100}
              color={ColorPalette.red}
              style={screenStyles.checkIconStyle}
            />
          ) : progress == 'customerOutside' ? (
            <Entypo
              name="bell"
              size={100}
              color={ColorPalette.white}
              style={screenStyles.checkIconStyle}
            />
          ) : (
            <Ionicons
              name={'checkmark-circle-outline'}
              size={100}
              color={ColorPalette.white}
              style={screenStyles.checkIconStyle}
            />
          )}
          {progress == 'justPlacedOrder' ? (
            <Text style={[screenStyles.heading, {color: ColorPalette.red}]}>
              Preparing!
            </Text>
          ) : progress == 'customerOutside' ? (
            <Text style={[screenStyles.heading, {color: ColorPalette.white}]}>
              On our way!
            </Text>
          ) : (
            <Text style={[screenStyles.heading, {color: ColorPalette.white}]}>
              Success!
            </Text>
          )}

          {progress == 'justPlacedOrder' ? (
            <Text style={[screenStyles.text, {color: ColorPalette.red}]}>
              Your order has been received will be ready to pick up soon.
            </Text>
          ) : progress == 'customerOutside' ? (
            <Text style={[screenStyles.text, {color: ColorPalette.white}]}>
              We have been notified that you are outside and ready to pick up
              your order.
            </Text>
          ) : (
            <Text style={[screenStyles.text, {color: ColorPalette.white}]}>
              Your order has been successfully picked Up!
            </Text>
          )}

          {!loading ? (
            <>
              <Text
                style={[
                  screenStyles.hotelNameText,
                  {
                    color:
                      progress == 'justPlacedOrder'
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
                      progress == 'justPlacedOrder'
                        ? ColorPalette.red
                        : ColorPalette.white,
                  },
                ]}>
                <Entypo
                  name="location-pin"
                  size={20}
                  color={
                    progress == 'justPlacedOrder'
                      ? ColorPalette.red
                      : ColorPalette.white
                  }
                />
                {order?.hotel.location}
              </Text>
              <Text
                style={[
                  screenStyles.orderNumberText,
                  {
                    color:
                      progress == 'justPlacedOrder'
                        ? ColorPalette.red
                        : ColorPalette.white,
                  },
                ]}>
                Order #{orderId}
              </Text>
            </>
          ) : (
            <ActivityIndicator
              color={
                progress == 'justPlacedOrder'
                  ? ColorPalette.red
                  : ColorPalette.white
              }
              size={20}
            />
          )}
        </View>
          {progress == 'justPlacedOrder' ? (
              <MyButton
                onPress={() => setProgress('customerOutside')}
                style={[
                  screenStyles.bottomButton,
                  {backgroundColor: ColorPalette.red},
                ]}>
                <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
                  I'm Outside!
                </Text>
              </MyButton>
          ) : progress == 'customerOutside' ? (
              <MyButton
                onPress={() => setProgress('handedOver')}
                style={[
                  screenStyles.bottomButton,
                  {backgroundColor: ColorPalette.white},
                ]}>
                <Text style={[commonStyles.boldText, commonStyles.redText]}>
                  Collect Order!
                </Text>
              </MyButton>
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
    </ScrollView>
  );
};

export default SuccessScreenCarryOut;
