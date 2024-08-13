import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';

import {useScreenContext} from '../../Contexts/ScreenContext';
import {HotelType} from '../HotelsContainer';
import styles from './style';
import {Searchbar} from 'react-native-paper';
import StaticVariables from '../../Preferences/StaticVariables';
import {FoodType} from '../FeaturedItemsComponent';
import {SetStateType} from '../../Types/Types';

type SearchFoodComponentPropsType = {
  hotel: HotelType;
  setSearchResults: SetStateType<FoodType[]>;
};
const SearchFoodComponent: React.FC<SearchFoodComponentPropsType> = ({
  hotel,
  setSearchResults,
}) => {
  const [searchText, setSearchText] = useState(StaticVariables.EMPTY_STRING);
  const [allFoodItems, setAllFoodItems] = useState<FoodType[]>(
    StaticVariables.EMPTY_ARRAY,
  );

  useEffect(() => {
    fetchAllFoodItems();
  }, []);
  useEffect(() => {
    search(searchText);
  }, [searchText]);

  const fetchAllFoodItems = () => {
    firestore()
      .collection('foods')
      .where('hotelId', '==', hotel.id)
      .get()
      .then(snapshot =>
        setAllFoodItems(snapshot.docs.map((i: any) => i.data())),
      );
  };

  const search = (text: string) => {
    if (text) {
      setSearchResults(
        allFoodItems.filter(i =>
          i.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    } else {
      setSearchResults(StaticVariables.EMPTY_ARRAY);
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
    <View style={{}}>
      <Searchbar
        style={screenStyles.searchBarStyle}
        placeholder="Search for food"
        onChangeText={setSearchText}
        value={searchText}
      />
    </View>
  );
};

export default SearchFoodComponent;
