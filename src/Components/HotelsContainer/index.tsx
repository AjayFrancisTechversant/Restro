import {FlatList, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HotelCard from '../HotelCard';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppSelector} from '../../hooks/hooks';
import {PrefenceType} from '../../Redux/Slices/UserDetailsSlice';
import styles from './style';

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
  const currentUserId = auth().currentUser?.uid;
  const [bookmarkedHotelIds, setBookmarkedHotelIds] = useState<string[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  useEffect(() => {
    const subscriber = firestore()
      .collection('bookmarks')
      .doc(currentUserId)
      .onSnapshot(documentSnapshot => {
        setBookmarkedHotelIds(documentSnapshot.data()?.bookmarkedHotelIds);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    fecthHotels();
  }, [preferenceFromRedux]);

  useEffect(() => {
    sortBasedOnBookmarks();
  }, [bookmarkedHotelIds]);

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

  const sortBasedOnBookmarks = () => {
    const tempArr: HotelType[] = [];
    hotels.map(hotel => {
      if (bookmarkedHotelIds.find(i => i == hotel.id)) {
        tempArr.unshift(hotel)
      }else tempArr.push(hotel)
      setHotels(tempArr)
    });

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
