import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import HotelCard from '../HotelCard';
import StaticVariables from '../../Preferences/StaticVariables';
export type HotelType = {
  name: string;
  location: string;
  rating: string;
  image: string;
};
const HotelsContainer = () => {
  const [hotels, setHotels] = useState<HotelType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  useEffect(() => {
    fecthHotels();
  }, []);
  const fecthHotels = async () => {
    const fetchedHotels: any = await firestore().collection('hotels').get();
    setHotels(fetchedHotels.docs.map((i: any) => i.data()));
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.container}>
      <FlatList
        ListEmptyComponent={<ActivityIndicator />}
        data={hotels}
        renderItem={({item}) => <HotelCard hotel={item} />}
      />
    </View>
  );
};

export default HotelsContainer;
