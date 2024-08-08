import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {useAppSelector} from '../../hooks/hooks';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import styles from './style';

const ZipcodeDisplayComponent = () => {
  const navigation = useNavigation();
  const {zipcode, region, country} = useAppSelector(state => state.userDetails);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.container}>
      <Text style={commonStyles.boldText}>
        {zipcode}
        {region && `, ${region}`}
        {country && `, ${country}`}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditZipcodeScreen' as never)}>
        <Feather size={20} name="edit" />
      </TouchableOpacity>
    </View>
  );
};

export default ZipcodeDisplayComponent;
