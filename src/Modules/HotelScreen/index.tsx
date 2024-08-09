import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Chip} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import MyButton from '../../Components/MyButton';
import styles from './style';
import ReviewsComponent from '../../Components/ReviewsComponent';
import FeaturedItemsComponent from '../../Components/FeaturedItemsComponent';

const HotelScreen = () => {
  const [goToReviewComponent, setGoToReviewComponent] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  console.log(goToReviewComponent);

  const handleReviews = () => {
    //fetch reviews from firebase
    setGoToReviewComponent(true);
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <Image
            style={screenStyles.bgImage}
            blurRadius={5}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/restro-8208a.appspot.com/o/HeroHotelImage.jpg?alt=media&token=4717bbdb-8a21-4038-a2a2-94942ad5de6f',
            }}
          />
          <View style={screenStyles.container}>
            <View style={screenStyles.headerComponentContainer}>
              <HeaderComponent color={ColorPalette.white} />
            </View>
            <View style={screenStyles.hotelDetailscontainer}>
              <Text style={commonStyles.bigBoldText}>Hotel Name</Text>
              <Text>
                <Entypo
                  name="location-pin"
                  color={ColorPalette.gray}
                  size={20}
                />
                Hotel location
              </Text>
              <View style={screenStyles.chipsContainer}>
                <Chip icon="check" disabled>
                  dine-in
                </Chip>
                <Chip icon="check" disabled>
                  carry-out
                </Chip>
                <Chip icon="check" disabled>
                  delivery
                </Chip>
              </View>
              <TouchableOpacity
                onPress={handleReviews}
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
                <Text> Rating</Text>
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
      renderItem={({item, index}) =>
        !goToReviewComponent ? (
          <FeaturedItemsComponent />
        ) : (
          <ReviewsComponent setGoToReviewComponent={setGoToReviewComponent} />
        )
      }
      centerContent={true}
      ListFooterComponent={
        !goToReviewComponent ? (
          <MyButton
            style={[
              screenStyles.bottomButton,
              {backgroundColor: ColorPalette.red},
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              View Menu
            </Text>
          </MyButton>
        ) : null
      }
    />
  );
};

export default HotelScreen;
