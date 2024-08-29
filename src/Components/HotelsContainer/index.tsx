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
  const [allHotels, setAllHotels] = useState<HotelType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [availableHotels, setAvailableHotels] = useState<HotelType[]>(
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
        if (documentSnapshot.exists) {
          setBookmarkedHotelIds(documentSnapshot.data()?.bookmarkedHotelIds);
        }
      });
    firestore()
      .collection('hotels').orderBy('name','asc')
      .get()
      .then(querrySnapshot => {
        setAllHotels(querrySnapshot.docs.map((i: any) => i.data()));
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    getAvailableHotels();
  }, [preferenceFromRedux, allHotels,bookmarkedHotelIds]);

  const getAvailableHotels = () => {
    if (preferenceFromRedux) {
      const filteredHotels: HotelType[] = allHotels.filter(i =>
        i.preferences.includes(preferenceFromRedux),
      );
      const tempArr: HotelType[] = [];
      filteredHotels.map(hotel => {
        if (bookmarkedHotelIds?.find(i => i == hotel.id)) {
          tempArr.unshift(hotel);
        } else tempArr.push(hotel);
        setAvailableHotels(tempArr);
      });
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
      data={availableHotels}
      renderItem={({item}) => <HotelCard bookmarkedHotelIds={bookmarkedHotelIds} hotel={item} />}
    />
  );
};

export default HotelsContainer;
