import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import MyButton from '../../Components/MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import HeaderComponent from '../../Components/HeaderComponent';
import StaticVariables from '../../Preferences/StaticVariables';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {color} from '@rneui/base';

type ProgressType = 'justPlacedOrder' | 'customerOutside' | 'handedOver';

const SuccessScreenCarryOut = () => {
  //get order details from db
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
  const handleFinish = () => {
    //clear order details from db using remove the doc using uid on finish
    navigation.popToTop();
  };
  return (
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
            We have been notified that you are outside and ready to pick up your
            order.
          </Text>
        ) : (
          <Text style={[screenStyles.text, {color: ColorPalette.white}]}>
            Your order has been successfully picked Up!
          </Text>
        )}

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
          Hotel Name
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
          Hotel location
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
          Order #333636
        </Text>
      </View>
      <View>
        {progress == 'justPlacedOrder' ? (
          <>
            <Text
              style={[
                screenStyles.text,
                {
                  color: ColorPalette.red,
                },
              ]}>
              For more Information about your order, Contact us!
            </Text>
            <MyButton
              onPress={() =>
                navigation.navigate(StaticVariables.ContactUsScreen)
              }
              style={[
                screenStyles.bottomButton,
                {
                  backgroundColor: ColorPalette.red,
                },
              ]}>
              <Text
                style={[
                  commonStyles.boldText,
                  {
                    color: ColorPalette.white,
                  },
                ]}>
                Contact Us
              </Text>
            </MyButton>
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
          </>
        ) : progress == 'customerOutside' ? (
          <>
            <Text
              style={[
                screenStyles.text,
                {
                  color: ColorPalette.white,
                },
              ]}>
              For more Information about your order, Contact us!
            </Text>
            <MyButton
              onPress={() =>
                navigation.navigate(StaticVariables.ContactUsScreen)
              }
              style={[
                screenStyles.bottomButton,
                {
                  backgroundColor: ColorPalette.white,
                },
              ]}>
              <Text
                style={[
                  commonStyles.boldText,
                  {
                    color: ColorPalette.red,
                  },
                ]}>
                Contact Us
              </Text>
            </MyButton>
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

export default SuccessScreenCarryOut;
