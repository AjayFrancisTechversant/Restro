import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {FoodInTheOrderType} from '../../Modules/OrderScreen';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';

type OrderItemCardPropsType = {
  food: FoodInTheOrderType;
  inSummaryScreen?: boolean;
};
const OrderItemCard: React.FC<OrderItemCardPropsType> = ({
  food,
  inSummaryScreen,
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
    <View style={screenStyles.card}>
      {!inSummaryScreen && (
        <View style={screenStyles.view1}>
          <TouchableOpacity>
            <AntDesign name="close" color={ColorPalette.red} size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={screenStyles.view2}>
        <Text style={commonStyles.boldText}>{food.name}</Text>
        <Text>Protein: replace this text</Text>
        <Text>Comments: {food.comment}</Text>
        <Text>Quantity: {food.quantity}</Text>
        <Text>PricePerQuantity: ${food.pricePerQuantity}</Text>
      </View>
      <View style={screenStyles.view3}>
        <Text style={commonStyles.boldText}>
          $ {food.quantity * food.pricePerQuantity}
        </Text>
      </View>
    </View>
  );
};

export default OrderItemCard;
