import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {HotelType} from '../../Components/HotelsContainer';
import styles from './style';
import SelectInitialCategoryCard from '../../Components/SelectInitialCategoryCard';
import CategoryHorizontalCard from '../../Components/CategoryHorizontalCard';

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
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <>
      {!selectedCategory ? (
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          style={screenStyles.container}
          ListHeaderComponent={
            <>
              <View style={screenStyles.headerComponentStyle}>
                <HeaderComponent color={ColorPalette.gray} />
              </View>
              <Text style={screenStyles.heading}>{hotel.name}</Text>
              <Text>SearchBar Component</Text>
            </>
          }
          data={[
            'All',
            'Apetizers',
            'Deserts',
            'Salads',
            'Sandwiches',
            'Soups',
            'Tacos',
          ]}
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
          style={screenStyles.container}
          ListHeaderComponent={
            <>
              <HeaderComponent color={ColorPalette.gray} />
              <Text style={screenStyles.heading}>{hotel.name}</Text>
              <Text>SearchBar Component</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={[
                  'All',
                  'Apetizers',
                  'Deserts',
                  'Salads',
                  'Sandwiches',
                  'Soups',
                  'Tacos',
                ]}
                renderItem={({item}) => (
                  <CategoryHorizontalCard
                    category={item}
                    setSelectedCategory={setSelectedCategory}
                  />
                )}
              />
            </>
          }
          data={[]}
          renderItem={null}
        />
      )}
    </>
  );
};

export default MenuScreen;
