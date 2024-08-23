import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';
import React, {FC, useEffect, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import SelectInitialCategoryCard from '../../Components/SelectInitialCategoryCard';
import CategoryHorizontalCard from '../../Components/CategoryHorizontalCard';
import StaticVariables from '../../Preferences/StaticVariables';
import {FoodType} from '../../Components/FeaturedItemsComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import FoodItemCard from '../../Components/FoodItemCard';
import SearchFoodComponent from '../../Components/SearchFoodComponent';
import ViewMyOrderButton from '../../Components/ViewMyOrderButton';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import styles from './style';

export type CategoryType =
  | 'All'
  | 'Soups'
  | 'Apetizers'
  | 'Salads'
  | 'Sandwiches'
  | 'Tacos'
  | 'Deserts'
  | undefined;

type MenuScreenPropsType = NativeStackScreenProps<
  HomeStackParamsList,
  'MenuScreen'
>;

const MenuScreen: FC<MenuScreenPropsType> = ({route}) => {
  const {hotel} = route.params;
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>(undefined);
  const [foodItems, setFoodItems] = useState<FoodType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  const [searchResults, setSearchResults] = useState<FoodType[]>(
    StaticVariables.EMPTY_ARRAY,
  );
  useEffect(() => {
    fetchFoodItems();
  }, [selectedCategory]);

  const allCategories: CategoryType[] = [
    'All',
    'Apetizers',
    'Deserts',
    'Salads',
    'Sandwiches',
    'Soups',
    'Tacos',
  ];
  const fetchFoodItems = () => {
    setLoading(true);
    if (selectedCategory == 'All') {
      firestore()
        .collection('foods')
        .where('hotelId', '==', hotel.id)
        .get()
        .then(snapshot => setFoodItems(snapshot.docs.map((i: any) => i.data())))
        .finally(() => setLoading(false));
    } else if (selectedCategory) {
      firestore()
        .collection('foods')
        .where(
          Filter.and(
            Filter('hotelId', '==', hotel.id),
            Filter('category', '==', selectedCategory.toLowerCase()),
          ),
        )
        .get()
        .then(snapshot => setFoodItems(snapshot.docs.map((i: any) => i.data())))
        .finally(() => setLoading(false));
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
    <View style={{flex: 1}}>
      {!selectedCategory ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[screenStyles.flatlist1contentContainerStyle]}
          style={screenStyles.container}
          ListHeaderComponent={
            <>
              <View style={screenStyles.headerComponentStyle}>
                <HeaderComponent color={ColorPalette.gray} />
              </View>
              <Text style={screenStyles.heading}>{hotel.name}</Text>
              <Text style={commonStyles.boldText}>Select a Category</Text>
            </>
          }
          data={allCategories}
          numColumns={screenContext.isPortrait ? 2 : 4}
          key={screenContext.isPortrait ? 'portrait1' : 'landscape1'}
          renderItem={({item}) => (
            <SelectInitialCategoryCard
              category={item}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={screenStyles.flatlist2contentContainerStyle}
          style={screenStyles.container}
          ListHeaderComponent={
            <>
              <HeaderComponent color={ColorPalette.gray} />
              <Text style={screenStyles.heading}>{hotel.name}</Text>
              <SearchFoodComponent
                setSearchResults={setSearchResults}
                hotel={hotel}
              />
              {searchResults == StaticVariables.EMPTY_ARRAY && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={allCategories}
                  renderItem={({item}) => (
                    <CategoryHorizontalCard
                      category={item}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  )}
                />
              )}
            </>
          }
          numColumns={screenContext.isPortrait ? 1 : 2}
          key={screenContext.isPortrait ? 'portrait2' : 'landscape2'}
          ListEmptyComponent={
            <Text style={[commonStyles.bigBoldText, screenStyles.noItemsText]}>
              No Items
            </Text>
          }
          data={
            loading
              ? [null]
              : searchResults == StaticVariables.EMPTY_ARRAY
              ? foodItems
              : searchResults
          }
          renderItem={({item}) =>
            !loading && item ? (
              <FoodItemCard hotel={hotel} food={item} />
            ) : (
              <ActivityIndicator size={50} color={ColorPalette.red} />
            )
          }
        />
      )}
      <ViewMyOrderButton />
    </View>
  );
};

export default MenuScreen;
