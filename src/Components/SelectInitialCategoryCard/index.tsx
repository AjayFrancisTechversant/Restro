import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {CategoryType} from '../../Modules/MenuScreen';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {SetStateType} from '../../Types/Types';

type SelectInitialCategoryCardPropsType = {
  category: CategoryType;
  setSelectedCategory: SetStateType<CategoryType>;
};

const SelectInitialCategoryCard: React.FC<
  SelectInitialCategoryCardPropsType
> = ({category, setSelectedCategory}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );

  return (
    <TouchableOpacity
      style={screenStyles.card}
      onPress={() => setSelectedCategory(category)}>
      {category == 'All' ? (
        <MaterialCommunityIcons
          color={ColorPalette.red}
          name="dots-square"
          size={40}
        />
      ) : category == 'Soups' ? (
        <Entypo color={ColorPalette.red} name="bowl" size={40} />
      ) : category == 'Apetizers' ? (
        <MaterialCommunityIcons
          color={ColorPalette.red}
          name="food-outline"
          size={40}
        />
      ) : category == 'Salads' ? (
        <FontAwesome6 name="bowl-food" color={ColorPalette.red} size={40} />
      ) : category == 'Sandwiches' ? (
        <MaterialCommunityIcons
          color={ColorPalette.red}
          name="food-steak"
          size={40}
        />
      ) : category == 'Tacos' ? (
        <MaterialCommunityIcons
          color={ColorPalette.red}
          name="taco"
          size={40}
        />
      ) : category == 'Deserts' ? (
        <Ionicons color={ColorPalette.red} name="ice-cream-outline" size={40} />
      ) : null}
      <Text>{category}</Text>
    </TouchableOpacity>
  );
};

export default SelectInitialCategoryCard;
