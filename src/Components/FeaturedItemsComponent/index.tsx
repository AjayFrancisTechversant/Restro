import {Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {HotelType} from '../HotelsContainer';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import FoodItemCard from '../FoodItemCard';

export type ProteinType = 'Chicken' | 'Beef' | 'Shrimp';

export type FoodType = {
  category: string;
  desc: string;
  name: string;
  hotelId: string;
  image: string;
  price: number;
  protein?: ProteinType;
};

type FeaturedItemsComponentPropsType = {
  hotel: HotelType;
};
const FeaturedItemsComponent: React.FC<FeaturedItemsComponentPropsType> = ({
  hotel,
}) => {
  const [featuredItems, setFeaturedItems] = useState<FoodType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  useEffect(() => {
    fetchFeaturedItems();
  }, []);
  const fetchFeaturedItems = () => {
    firestore()
      .collection('foods')
      .where('hotelId', '==', hotel.id)
      .limit(3)
      .get()
      .then(querySnapshot => {
        setFeaturedItems(querySnapshot.docs.map((i: any) => i.data()));
      });
  };
  return (
    <FlatList
      style={screenStyles.container}
      ListHeaderComponent={
        <Text style={commonStyles.bigBoldText}>Featured Items</Text>
      }
      data={featuredItems}
      ListEmptyComponent={
        <ActivityIndicator size={40} color={ColorPalette.gray} />
      }
      renderItem={({item}) => <FoodItemCard hotel={hotel} food={item} />}
    />
  );
};

export default FeaturedItemsComponent;
