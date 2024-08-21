import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import scooterImage from '../../Assets/Images/scooterImage.png';
import styles from './style';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {HomeStackParamsList} from '../../Services/Navigation/HomeStack';

type TrackingScreenPropsType = NativeStackScreenProps<
  HomeStackParamsList,
  'TrackingScreen'
>;

const TrackingScreen: FC<TrackingScreenPropsType> = ({route}) => {
  const {setProgress} = route.params;
  const navigation = useNavigation();
  const regions: Region[] = [
    {
      latitude: 10.011314861360566,
      latitudeDelta: 0.001211397491797328,
      longitude: 76.36576479300857,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010903798173786,
      latitudeDelta: 0.001211399025995874,
      longitude: 76.36594651266932,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010559099003807,
      latitudeDelta: 0.0012114003124796824,
      longitude: 76.36551400646567,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010340855374562,
      latitudeDelta: 0.001211401126967715,
      longitude: 76.36563705280423,
      longitudeDelta: 0.0006601586937904358,
    },
  ];
  const mapRef = useRef<MapView>();
  const [markerPosition, setMarkerPosition] = useState(regions[0]);

  useEffect(() => {
    changePositions();
  }, []);
  const changePositions = () => {
    var count = 0;
    const inte = setInterval(() => {
      setMarkerPosition(regions[count]);
      mapRef.current?.animateToRegion(markerPosition, 500);
      count += 1;
      if (count > regions.length - 1) {
        clearInterval(inte);
        setProgress('handedOver');
        navigation.goBack();
      }
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
          <Marker image={scooterImage} coordinate={markerPosition} />
        </MapView>
      </View>
    </View>
  );
};

export default TrackingScreen;
