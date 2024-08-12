import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HotelCard from '../HotelCard';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

export type HotelType = {
  name: string;
  location: string;
  rating: string;
  image: string;
  id: string;
};

const HotelsContainer = () => {
  const [hotels, setHotels] = useState<HotelType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  useEffect(() => {
    fecthHotels();
  }, []);
  const fecthHotels = () => {
    firestore()
      .collection('hotels')
      .get()
      .then(querySnapshot =>
        setHotels(querySnapshot.docs.map((i: any) => i.data())),
      );
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
        ListEmptyComponent={<ActivityIndicator size={50} color={ColorPalette.gray}/>}
        data={hotels}
        renderItem={({item}) => <HotelCard hotel={item} />}
      />
    </View>
  );
};

export default HotelsContainer;
