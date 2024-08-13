import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {HotelType} from '../HotelsContainer';
import styles from './style';

type SearchFoodComponentPropsType = {
  hotel: HotelType;
};
const SearchFoodComponent: React.FC<SearchFoodComponentPropsType> = ({
  hotel,
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
      <View>
        <Text>SearchFoodComponent</Text>
    </View>
  );
};

export default SearchFoodComponent;
