import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type OrderDetailsComponentPropsType = {
  editable?: boolean;
};

const OrderDetailsComponent: React.FC<OrderDetailsComponentPropsType> = ({
  editable,
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
    <FlatList
      ListHeaderComponent={null}
      data={['']}
      renderItem={() => <Text>orderdetails component</Text>}
      ListFooterComponent={null}
    />
  );
};

export default OrderDetailsComponent;
