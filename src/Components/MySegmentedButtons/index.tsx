import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {
  PreferenceType,
  updatePreference,
} from '../../Redux/Slices/UserDetailsSlice';
import {OrderType} from '../../Modules/OrderScreen';
import styles from './style';
import LoadingComponent from '../LoadingComponent';
import StaticVariables from '../../Preferences/StaticVariables';

type MySegmentedButtonsPropsType = {
  restrictedEditing?: boolean;
};
const MySegmentedButtons: React.FC<MySegmentedButtonsPropsType> = ({
  restrictedEditing,
}) => {
  const currentUserId = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderType>();
  const dispatch = useAppDispatch();
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  if (restrictedEditing) {
    useEffect(() => {
      fetchOrder();
    }, []);
  }
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const querrySnapshot = await firestore()
        .collection('orders')
        .doc(currentUserId)
        .get();
      if (querrySnapshot.exists) {
        const order: any = querrySnapshot.data();
        setOrder(order);
        dispatch(updatePreference(order.userPreference));
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const renderNonEditableAlert = () => {
    return Alert.alert(
      'Unavailable!',
      `Selected restaurant doesn't provide this option. Please change restaurant for this availing this option`,
      [
        {
          text: 'Change restaurant',
          onPress: () => navigation.navigate(StaticVariables.HomeStack),
        },
        {text: 'Cancel'},
      ],
    );
  };

  const handlePress = async (clickedPreference: PreferenceType) => {
    if (preferenceFromRedux != clickedPreference) {
      if (order) {
        if (order?.hotel.preferences.find(i => i == clickedPreference)) {
          try {
            setLoading(true);
            await firestore().collection('orders').doc(currentUserId).update({
              userPreference: clickedPreference,
            });
            dispatch(updatePreference(clickedPreference));
          } catch (error) {
            Alert.alert((error as Error).message);
          } finally {
            setLoading(false);
          }
        } else renderNonEditableAlert();
      } else dispatch(updatePreference(clickedPreference));
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <View style={screenStyles.MySegmentedButtonsContainer}>
      <View style={screenStyles.container}>
        <TouchableOpacity
          onPress={() => handlePress('dine-in')}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'dine-in'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'dine-in'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Dine-in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('carry-out')}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'carry-out'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'carry-out'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Carry-out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('delivery')}
          style={[
            screenStyles.eachButtonStyle,
            {
              backgroundColor:
                preferenceFromRedux == 'delivery'
                  ? ColorPalette.red
                  : ColorPalette.white,
            },
          ]}>
          <Text
            style={[
              commonStyles.boldText,
              {
                color:
                  preferenceFromRedux == 'delivery'
                    ? ColorPalette.white
                    : ColorPalette.gray,
              },
            ]}>
            Delivery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MySegmentedButtons;
