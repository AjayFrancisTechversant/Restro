import {Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import pointerImage from '../../Assets/Images/pointerImage.png';
import {gethotelLatLng, getRoute} from '../../Services/API/getRoute';
import { OrderStackParamsList } from '../../Services/Navigation/OrderStack';
import styles from './style';

type TrackingScreenPropsType = NativeStackScreenProps<
  OrderStackParamsList,
  'TrackingScreen'
>;

const TrackingScreen: FC<TrackingScreenPropsType> = ({route}) => {
  const {setProgress, order} = route.params;
  const hotelId = order.hotel.id;
  const navigation = useNavigation();

  const mapRef = useRef<MapView>(null);
  const regions: Region[] = getRoute(hotelId);
  const [markerPosition, setMarkerPosition] = useState(regions[0]);
  useEffect(() => {
    changePositions();
  }, []);
  const changePositions = () => {
    var count = 0;
    const inte = setInterval(() => {
      if (count >= regions.length ) {
        clearInterval(inte);
        setProgress('handedOver');
        navigation.goBack();
      }
      setMarkerPosition(regions[count]);
      mapRef.current?.animateToRegion(markerPosition, 500);
      count += 1;
    }, 2000);
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
    <View style={screenStyles.container}>
      <TouchableOpacity
        style={screenStyles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={ColorPalette.gray} size={30} />
      </TouchableOpacity>
      <Text style={screenStyles.heading}>Track Your Order</Text>
      <View style={screenStyles.mapContainer}>
        <MapView
          ref={mapRef}
          region={markerPosition}
          style={commonStyles.flexOne}
          provider={PROVIDER_GOOGLE}
          showsUserLocation>
          <Marker image={pointerImage} coordinate={markerPosition} />
          <Marker  coordinate={gethotelLatLng(hotelId)}>
            <Callout>
              <Text>{hotelId}</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

export default TrackingScreen;
