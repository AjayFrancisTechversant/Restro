import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import {CategoryType} from '../../Modules/MenuScreen';
import {SetStateType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';

type CategoryHorizontalCardPropsType = {
  category: CategoryType;
  setSelectedCategory: SetStateType<CategoryType>;
  selectedCategory: CategoryType;
};

const CategoryHorizontalCard: React.FC<CategoryHorizontalCardPropsType> = ({
  category,
  setSelectedCategory,
  selectedCategory,
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
    <TouchableOpacity
      style={screenStyles.card}
      onPress={() => setSelectedCategory(category)}>
      {category == 'All' ? (
        <MaterialCommunityIcons
          color={
            category == selectedCategory ? ColorPalette.red : ColorPalette.gray
          }
          name="dots-square"
          size={40}
        />
      ) : category == 'Soups' ? (
        <Entypo
        color={
          category == selectedCategory ? ColorPalette.red : ColorPalette.gray
        }
          name="bowl"
          size={40}
        />
      ) : category == 'Apetizers' ? (
        <MaterialCommunityIcons
        color={
          category == selectedCategory ? ColorPalette.red : ColorPalette.gray
        }
          name="food-outline"
          size={40}
        />
      ) : category == 'Salads' ? (
        <FontAwesome6
          name="bowl-food"
          color={
            category == selectedCategory ? ColorPalette.red : ColorPalette.gray
          }
          size={40}
        />
      ) : category == 'Sandwiches' ? (
        <MaterialCommunityIcons
        color={
          category == selectedCategory ? ColorPalette.red : ColorPalette.gray
        }
          name="food-steak"
          size={40}
        />
      ) : category == 'Tacos' ? (
        <MaterialCommunityIcons
        color={
          category == selectedCategory ? ColorPalette.red : ColorPalette.gray
        }
          name="taco"
          size={40}
        />
      ) : category == 'Deserts' ? (
        <Ionicons
        color={
          category == selectedCategory ? ColorPalette.red : ColorPalette.gray
        }
          name="ice-cream-outline"
          size={40}
        />
      ) : null}
      <Text
        style={[
          commonStyles.boldText,
          {
            color:
              selectedCategory == category
                ? ColorPalette.red
                : ColorPalette.gray,
          },
        ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryHorizontalCard;
