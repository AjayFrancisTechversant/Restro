import {View, Text} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';

const SuccessScreenDineIn = () => {
  // get order details from db
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
    <View style={screenStyles.container}>
      <View>
        <HeaderComponent color={ColorPalette.white} />
        <Ionicons
          name="checkmark-circle-outline"
          size={100}
          color={ColorPalette.white}
          style={screenStyles.checkIconStyle}
        />
        <Text style={screenStyles.heading}>Success!</Text>
        <Text style={screenStyles.text}>
          Your order has been received and is being prepared.
        </Text>
        <Text style={screenStyles.hotelNameText}>Hotel Name</Text>
        <Text style={screenStyles.text}>
          <Entypo name="location-pin" size={20} color={ColorPalette.white} />
          Hotel location
        </Text>
        <Text style={screenStyles.orderNumberText}>Order #333636</Text>
      </View>
      <View>
        <Text style={screenStyles.text}>
          For more Information about your order, Contact us!
        </Text>
        <MyButton
          onPress={() => navigation.navigate(StaticVariables.ContactUsScreen)}
          style={screenStyles.bottomButton}>
          <Text style={[commonStyles.boldText, commonStyles.redText]}>
            Contact Us
          </Text>
        </MyButton>
        <MyButton onPress={handleFinish} style={screenStyles.bottomButton}>
          <Text style={[commonStyles.boldText, commonStyles.redText]}>
            Go To Home
          </Text>
        </MyButton>
      </View>
    </View>
  );
};

export default SuccessScreenDineIn;
