import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {FC} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Chip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import FeaturedItemsComponent from '../../Components/FeaturedItemsComponent';
import StaticVariables from '../../Preferences/StaticVariables';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';
import styles from './style';

type HotelScreenPropstype = NativeStackScreenProps<
  HomeStackParamsList,
  'HotelScreen'
>;

const HotelScreen: FC<HotelScreenPropstype> = ({route}) => {
  const navigation: any = useNavigation();
  const {hotel} = route.params;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Image
            style={screenStyles.bgImage}
            blurRadius={5}
            source={{
              uri: hotel.image,
            }}
          />
          <View style={screenStyles.container}>
            <View style={screenStyles.headerComponentContainer}>
              <HeaderComponent color={ColorPalette.white} />
            </View>
            <View style={screenStyles.hotelDetailscontainer}>
              <Text style={commonStyles.bigBoldText}>{hotel.name}</Text>
              <Text>
                <Entypo
                  name="location-pin"
                  color={ColorPalette.gray}
                  size={20}
                />
                {hotel.location}
              </Text>
              <View style={screenStyles.chipsContainer}>
                {hotel.preferences.map((preference, index) => (
                  <Chip key={index} icon="check" disabled>
                    {preference}
                  </Chip>
                ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(StaticVariables.ReviewsScreen, {hotel})
                }
                style={screenStyles.ratingsContainerButton}>
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome name="star" color={ColorPalette.red} size={20} />
                <FontAwesome
                  name="star-half-empty"
                  color={ColorPalette.red}
                  size={20}
                />
                <Text> {hotel.rating}</Text>
              </TouchableOpacity>
              <View style={screenStyles.reservationContainer}>
                <Text style={commonStyles.redText}>
                  <Entypo name="plus" size={20} /> Make a reservation
                </Text>
                <MyButton style={screenStyles.contactButton}>
                  <Text style={commonStyles.redText}>Contact</Text>
                </MyButton>
              </View>
            </View>
          </View>
        </>
      }
      data={['']}
      renderItem={() => <FeaturedItemsComponent hotel={hotel} />}
      ListFooterComponent={
        <MyButton
          onPress={() =>
            navigation.navigate(StaticVariables.MenuScreen, {hotel})
          }
          style={[
            screenStyles.bottomButton,
            {backgroundColor: ColorPalette.red},
          ]}>
          <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
            View Menu
          </Text>
        </MyButton>
      }
    />
  );
};

export default HotelScreen;
