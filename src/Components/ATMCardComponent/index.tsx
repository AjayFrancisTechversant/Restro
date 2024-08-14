import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useAppSelector} from '../../hooks/hooks';
import styles from './style';

const ATMCardComponent = () => {
  const {number, expiry, name} = useAppSelector(
    state => state.cardDetails,
  );
  const navigation = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.atmCard}>
      <View style={screenStyles.headerComponent}>
        <Text style={[commonStyles.bigBoldText, commonStyles.whiteText]}>
          VISA
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="edit" color={ColorPalette.white} size={30} />
        </TouchableOpacity>
      </View>
      <View style={screenStyles.cardNumberConatiner}>
        <View style={[commonStyles.flexDirectionRow, {gap: 2}]}>
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
        </View>
        <View style={[commonStyles.flexDirectionRow, {gap: 2}]}>
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
        </View>
        <View style={[commonStyles.flexDirectionRow, {gap: 2}]}>
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
        </View>
        <View style={[commonStyles.flexDirectionRow]}>
          <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
            {number.slice(number.length - 4, number.length)}
          </Text>
        </View>
      </View>
      <View style={screenStyles.detailsContainer}>
        <View>
          <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
            Expiry
          </Text>
          <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
            {expiry}
          </Text>
        </View>
        <View>
          <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
            CVV
          </Text>
          <View style={[commonStyles.flexDirectionRow, {gap: 2}]}>
            <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
            <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
            <Octicons name="dot-fill" size={20} color={ColorPalette.white} />
          </View>
        </View>
      </View>
      <Text style={[commonStyles.boldText, commonStyles.whiteText]}>
        {name}
      </Text>
    </View>
  );
};

export default ATMCardComponent;
