import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {HotelType} from '../../Components/HotelsContainer';
import styles from './style';
import SelectInitialCategoryCard from '../../Components/SelectInitialCategoryCard';
import CategoryHorizontalCard from '../../Components/CategoryHorizontalCard';
import StaticVariables from '../../Preferences/StaticVariables';
import {FoodType} from '../../Components/FeaturedItemsComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import FoodItemCard from '../../Components/FoodItemCard';
import SearchFoodComponent from '../../Components/SearchFoodComponent';
import MyButton from '../../Components/MyButton';

export type CategoryType =
  | 'All'
  | 'Soups'
  | 'Apetizers'
  | 'Salads'
  | 'Sandwiches'
  | 'Tacos'
  | 'Deserts'
  | undefined;

const MenuScreen = ({route}: any) => {
  const hotel: HotelType = route.params.hotel;
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
    if (selectedCategory == 'All') {
      firestore()
        .collection('foods')
        .where('hotelId', '==', hotel.id)
        .get()
        .then(snapshot =>
          setFoodItems(snapshot.docs.map((i: any) => i.data())),
        );
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
        .then(snapshot =>
          setFoodItems(snapshot.docs.map((i: any) => i.data())),
        );
    }
  };

  const handleViewOrder = () => [
    //navigate to orderScreen
  ];
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
          numColumns={2}
          key={screenContext.isPortrait ? 'portrait' : 'landscape'}
          renderItem={({item}) => (
            <SelectInitialCategoryCard
              category={item}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        />
      ) : (
        <FlatList
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
          ListEmptyComponent={
            <Text style={[commonStyles.bigBoldText, screenStyles.noItemsText]}>
              No Items
            </Text>
          }
          data={
            searchResults == StaticVariables.EMPTY_ARRAY
              ? foodItems
              : searchResults
          }
          renderItem={({item}) => <FoodItemCard hotel={hotel} food={item} />}
        />
      )}
      <MyButton onPress={handleViewOrder} style={screenStyles.ViewOrderButton}>
        <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
          View my Orders $ 0.00
        </Text>
      </MyButton>
    </View>
  );
};

export default MenuScreen;
