import {FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HotelCard from '../HotelCard';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';
import {useAppSelector} from '../../hooks/hooks';
import {PrefenceType} from '../../Redux/Slices/UserDetailsSlice';

export type HotelType = {
  name: string;
  location: string;
  image: string;
  id: string;
  preferences: PrefenceType[];
};

const HotelsContainer = () => {
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const [hotels, setHotels] = useState<HotelType[]>(
    StaticVariables.EMPTY_ARRAY,
  );

  useEffect(() => {
    fecthHotels();
  }, [preferenceFromRedux]);
  const fecthHotels = () => {
    if (preferenceFromRedux) {
      setHotels(StaticVariables.EMPTY_ARRAY);
      firestore()
        .collection('hotels')
        .where('preferences', 'array-contains', preferenceFromRedux)
        .get()
        .then(querySnapshot =>
          setHotels(querySnapshot.docs.map((i: any) => i.data())),
        );
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
  return (
    <FlatList
      style={screenStyles.container}
      ListEmptyComponent={
        <ActivityIndicator size={50} color={ColorPalette.red} />
      }
      data={hotels}
      renderItem={({item}) => <HotelCard hotel={item} />}
    />
  );
};

export default HotelsContainer;
